import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { listarClases } from '../../data/clases.conexion'; 
import { Clase  } from '../../interfaces/interfaces'; 
import { useEffect, useState } from 'react';
import Horario from '../../components/Horario';
export default function Clases() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [horario, setHorario] = useState<HorarioDisponible[]>([]);
  const [allClasses, setAllClasses] = useState<HorarioDisponible[]>([]);

  interface HorarioDisponible {
    id?: number;
    titulo?: string;
    descripcion?: string;
    dia: string;
    horaInicio: string;
    horaFin: string;
    profesor_nombre?: string;
    materia_nombre?: string;
    salon_codigo?: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lista: Clase[] = await listarClases();
        
        const horarios = lista.map((item) => {
          const descripcion = `${item.profesor_nombre}, ${item.materia_nombre}, ${item.salon_codigo}`;

          return {
            id: item.id ?? 0, // Default to 0 if id is undefined
            titulo: item.grupo,
            dia: item.dia_semana,
            horaInicio: item.hora_inicio,
            horaFin: item.hora_fin,
            descripcion: descripcion.trim(),
            profesor_nombre: item.profesor_nombre
          };
        });

        setAllClasses(horarios);
        setHorario(horarios);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredClasses = allClasses.filter(clase => 
      clase.profesor_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setHorario(filteredClasses);
  }, [searchTerm, allClasses]);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br bg-white relative min-h-screen px-0 pt-28 pl-4 md:pl-16 lg:pl-52 pr-6">
        <div className="flex gap-4 ml-10 mt-2">
          <Link
            to="/clases"
            className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            crear clases
          </Link>
          <input
            type="text"
            placeholder="Buscar profesor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <Horario
  listadoClases={horario.map((clase) => ({
    id: clase.id ?? 0, // Asegúrate de que `id` no sea opcional
    titulo: clase.titulo,
    descripcion: clase.descripcion,
    dia: clase.dia,
    horaInicio: clase.horaInicio,
    horaFin: clase.horaFin,
  }))}
/>
      </div>
    </>
  );
}