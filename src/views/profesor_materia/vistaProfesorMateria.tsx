import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Link } from 'react-router-dom';

export default function VisualizarProfesorMateria() {
  const [profesorMaterias, setProfesorMaterias] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/profesor_materia`);
        setProfesorMaterias(response.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setMensaje('Error al cargar los datos');
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta relación profesor-materia?')) {
      try {
        await axios.delete(`${host}/profesor_materia/${id}`); // Asumiendo que tienes el endpoint para eliminar
        setProfesorMaterias(prevState => prevState.filter(pm => pm.id !== id));
        setMensaje('Relación eliminada con éxito.');
      } catch (error) {
        console.error('Error al eliminar la relación:', error);
        setMensaje('Error al eliminar la relación.');
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
        <div className="w-full max-w-md p-6 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-md">
        <Link to="/profesormateria/crear" className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300">
              Crear PofesorMateria
            </Link>
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Visualizar Profesor-Materia</h2>

          {mensaje && (
            <div className={`mb-4 p-4 text-center text-white rounded ${mensaje.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
              {mensaje}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-green-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-green-700">ID</th>
                  <th className="py-2 px-4 border-b text-green-700">Profesor</th>
                  <th className="py-2 px-4 border-b text-green-700">Materia</th>
                  <th className="py-2 px-4 border-b text-green-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {profesorMaterias.length > 0 ? (
                  profesorMaterias.map((profesorMateria) => (
                    <tr key={profesorMateria.id}>
                      <td className="py-2 px-4 border-b">{profesorMateria.id}</td>
                      <td className="py-2 px-4 border-b">{profesorMateria.profesor_id}</td>
                      <td className="py-2 px-4 border-b">{profesorMateria.materia_id}</td>
                      <td className="py-2 px-4 border-b text-center">
                        <Link
                          to={`/profesor_materia/editar/${profesorMateria.id}`}
                          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 mr-2"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(profesorMateria.id)}
                          className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-2 px-4 text-center">No hay datos disponibles</td>
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
