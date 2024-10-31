import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { listarClases, eliminarClase } from '../../data/clases.conexion'; 
import { Clase, Materia, Profesor, Salon } from '../../interfaces/interfaces'; 
import { useEffect, useState } from 'react';
import Horario from '../../components/Horario'; // Asegúrate de que el componente Horario esté bien implementado
import { listarMaterias } from '../../data/materias.conexion';
import { listarProfesores } from '../../data/profesores.conexion';
import { listarSalones } from '../../data/salones.conexion';

export default function Clases() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [horario, setHorario] = useState<HorarioDisponible[]>([]); // Estado para el horario

interface HorarioDisponible {
  id?: number;
  titulo?: string;
  descripcion?:string;
  dia: string;
  horaInicio: string;
  horaFin: string;
}

interface Horario {
  id?: string;
  titulo?: string;
  descripcion?: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lista: Clase[] = await listarClases(); // Assuming listarClases returns Clase[]
        const materias: Materia[] = await listarMaterias(); // Assuming it returns Materia[]
        const profesores: Profesor[] = await listarProfesores(); // Assuming it returns Profesor[]
        const salones: Salon[] = await listarSalones(); // Assuming it returns Salon[]

        console.log(lista);

        const horarios = lista.map((item) => {
          const materia = materias.find(m => m.id === item.materia_id);
          const profesor = profesores.find(p => p.id === item.profesor_id);
          const salon = salones.find(s => s.id === item.salon_id);

            const descripcion = `
            ${materia ? materia.nombre : 'Materia no encontrada'}, 
            ${profesor ? profesor.nombre : 'Profesor no encontrado'}, 
            ${salon ? salon.codigo : 'Salón no encontrado'}
          `;

          return {
            id: item.id,
            titulo: item.grupo,
            dia: item.dia_semana,
            horaInicio: item.hora_inicio,
            horaFin: item.hora_fin,
            descripcion: descripcion.trim(),
          };
        });

        setHorario(horarios); // Update state with the fetched horarios
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


    // Limpiar el timeout en caso de que el componente se desmonte antes de que se ejecute el timeout

  return (
    <>

      <Navbar />
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-cyan-700 relative min-h-screen px-0 pt-28 pl-4 md:pl-16 lg:pl-52 pr-6">
        <Link
              to="/clases"
              className="bg-green-600 absolute ml-10 mt-2 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
            >crear clases</Link>
     
      <Horario listadoClases={horario} />
      </div>

    </>
  );

}
