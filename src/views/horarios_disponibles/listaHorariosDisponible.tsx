import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { host } from '../../data/server';

// Tipos para los datos de horario y profesor
interface Horario {
  id: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
  profesor_id: string;
}

interface Profesor {
  cedula: string;
  nombre: string;
}

export default function listaHorariosDisponibles() {
  // Tipado para los estados de horarios y profesores
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [mensaje, setMensaje] = useState<string>('');

  // Función para obtener los horarios disponibles
  const fetchHorarios = async () => {
    try {
      const response = await axios.get<Horario[]>(`${host}/horarios_disponibles`);
      setHorarios(response.data);
    } catch (error) {
      console.error('Error al cargar horarios disponibles:', error);
      setMensaje('Error al cargar horarios disponibles.');
    }
  };

  // Función para obtener los profesores
  const fetchProfesores = async () => {
    try {
      const response = await axios.get<Profesor[]>(`${host}/profesores`);
      setProfesores(response.data);
    } catch (error) {
      console.error('Error al cargar profesores:', error);
      setMensaje('Error al cargar profesores.');
    }
  };

  // Uso de useEffect para cargar horarios y profesores al montar el componente
  useEffect(() => {
    fetchHorarios();
    fetchProfesores();
  }, []);

  // Función para obtener el nombre del profesor basado en el ID
  const getProfesorNombre = (profesorId: string): string => {
    const profesor = profesores.find((p) => p.cedula === profesorId);
    return profesor ? profesor.nombre : 'Desconocido';
  };

  // Función para eliminar un horario
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      try {
        await axios.delete(`${host}/horarios_disponibles/${id}`);
        setHorarios(prevState => prevState.filter(horario => horario.id !== id));
        setMensaje('Horario eliminado con éxito.');
      } catch (error) {
        console.error('Error al eliminar el horario:', error);
        setMensaje('Error al eliminar el horario.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat"
         style={{
           backgroundImage: `url('https://c.wallhere.com/photos/64/fc/3840x2160_px_animals_artwork_Clear_Sky_Deer_digital_art_drawing_Firewatch-516653.jpg!d')`,
         }}>
      <Navbar />
      <div className="relative min-h-screen flex flex-col items-center pt-32">
        <div className="w-full max-w-4xl p-6 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-md">
          <div>
            <Link to="/horarios-disponibles/crear" className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300">
              Crear Nuevo Horario Disponible
            </Link>
            <p></p>
          </div>

          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Horarios Disponibles</h2>

          {mensaje && (
            <div className={`mb-4 p-4 text-center text-white rounded ${mensaje.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
              {mensaje}
            </div>
          )}

          <table className="min-w-full bg-white border border-green-300">
            <thead>
              <tr>
                <th className="py-2 border-b text-left text-green-700">Día</th>
                <th className="py-2 border-b text-left text-green-700">Hora de Inicio</th>
                <th className="py-2 border-b text-left text-green-700">Hora de Fin</th>
                <th className="py-2 border-b text-left text-green-700">Profesor</th>
                <th className="py-2 border-b text-left text-green-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {horarios.length > 0 ? (
                horarios.map((horario) => (
                  <tr key={horario.id}>
                    <td className="py-2 border-b text-center">{horario.dia}</td>
                    <td className="py-2 border-b text-center">{horario.hora_inicio}</td>
                    <td className="py-2 border-b text-center">{horario.hora_fin}</td>
                    <td className="py-2 border-b text-center">{getProfesorNombre(horario.profesor_id)}</td>
                    <td className="py-2 border-b text-center">
                      <Link
                        to={`/horarios/editar/${horario.id}`}
                        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 mr-2"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(horario.id)}
                        className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-2 border-b text-center">No hay horarios disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
