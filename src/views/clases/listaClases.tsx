import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { listarClases, eliminarClase } from '../../data/clases.conexion'; 
import { Clase } from '../../interfaces/interfaces'; 
import { useEffect, useState } from 'react';
import Horario from '../../components/Horario'; // Asegúrate de que el componente Horario esté bien implementado

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
        const lista  = await listarClases();
        
        console.log(lista)
        const horarios = await lista.map((item) => ({
          id: item.id,
          descripcion:"descripcion",
          titulo: item.grupo,
          dia: item.dia_semana, // Asumiendo que el campo original es 'dia_semana'
          horaInicio: item.hora_inicio, // Cambiar nombre de 'hora_inicio' a 'horaInicio'
          horaFin: item.hora_fin,
        }));

        setHorario(horarios)
        console.log(horario)

      } catch (error) {
        console.error('Error al obtener la lista de clases:', error);
      }
    };

    fetchData();
  }, []);


    // Limpiar el timeout en caso de que el componente se desmonte antes de que se ejecute el timeout

  return (
    <>

      <Navbar />
      <div className="bg-zinc-900 relative min-h-screen  pt-28 pl-4 md:pl-16 lg:pl-52 pr-6">
        <Link
              to="/clases"
              className="bg-green-600 absolute ml-10 mt-2 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
            >crear clases</Link>
     
      <Horario listadoClases={horario} />
      </div>

    </>
  );

}
