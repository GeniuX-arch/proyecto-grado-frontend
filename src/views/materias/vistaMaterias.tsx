import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Materias } from '../../interfaces/interfaces';
import { Link } from 'react-router-dom';

export default function VerMaterias() {
  const [materias, setMaterias] = useState<Materias[]>([]);
  const [mensaje, setMensaje] = useState<string>('');

  const fetchMaterias = async () => {
    try {
      const response = await axios.get(`${host}/materias`);
      setMaterias(response.data);
    } catch (error) {
      console.error('Error al obtener las materias:', error);
      setMensaje('Error al cargar las materias');
    }
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta materia?')) {
      try {
        await axios.delete(`${host}/materias/${id}`); // Asumiendo que tienes el endpoint para eliminar
        setMaterias(prevState => prevState.filter(materia => materia.id !== id));
        setMensaje('Materia eliminada con éxito.');
      } catch (error) {
        console.error('Error al eliminar la materia:', error);
        setMensaje('Error al eliminar la materia.');
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://c.wallhere.com/photos/64/fc/3840x2160_px_animals_artwork_Clear_Sky_Deer_digital_art_drawing_Firewatch-516653.jpg!d')`,
      }}
    >
      <Navbar />
      <div className="relative min-h-screen flex flex-col items-center pt-32">
        <div className="w-full max-w-4xl p-6 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-md">
          <div>
            <Link to="/materias/crear" className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300">
              Crear nueva materia
            </Link>
            <p></p>
          </div>
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Materias</h2>

          {mensaje && (
            <div className={`mb-4 p-4 text-center text-white rounded ${mensaje.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
              {mensaje}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-green-700">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2 text-green-700">Calificación Alumno</th>
                  <th className="border border-gray-300 px-4 py-2 text-green-700">Experiencia</th>
                  <th className="border border-gray-300 px-4 py-2 text-green-700">Alumnos</th>
                  <th className="border border-gray-300 px-4 py-2 text-green-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {materias.length > 0 ? (
                  materias.map((materia) => (
                    <tr key={materia.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">{materia.nombre}</td>
                      <td className="border border-gray-300 px-4 py-2">{materia.calificacion_alumno}</td>
                      <td className="border border-gray-300 px-4 py-2">{materia.experiencia}</td>
                      <td className="border border-gray-300 px-4 py-2">{materia.alumnos}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <Link
                          to={`/materias/editar/${materia.id}`}
                          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 mr-2"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(materia.id)}
                          className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="border border-gray-300 px-4 py-2 text-center">No hay materias disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
