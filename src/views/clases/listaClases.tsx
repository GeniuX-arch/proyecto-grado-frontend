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
      <Link to="/clases">Crear Clase</Link>
      <Navbar />
     
      <Horario listadoClases={horario} />

    </>
  );

}
