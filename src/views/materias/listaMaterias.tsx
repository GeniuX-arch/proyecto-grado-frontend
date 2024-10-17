import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Materia } from '../../interfaces/interfaces';
import { Link } from 'react-router-dom';

export default function VerMaterias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
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
        await axios.delete(`${host}/materias/${id}`);
        setMaterias((prevState) => prevState.filter((materia) => materia.id !== id));
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
            <Link
              to="/materias/crear"
              className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
            >
              Crear nueva materia
            </Link>
            <p></p>
          </div>
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Materias</h2>

          {mensaje && (
            <div
              className={`mb-4 p-4 text-center text-white rounded ${
                mensaje.includes('Error') ? 'bg-red-500' : 'bg-green-500'
              }`}
            >
              {mensaje}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-green-700">Código</th>
                  <th className="border border-gray-300 px-4 py-2 text-green-700">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2 text-green-700">Alumnos</th>
                  <th className="border border-gray-300 px-4 py-2 text-green-700">Bloques</th>
                  <th className="border border-gray-300 px-4 py-2 text-green-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {materias.length > 0 ? (
                  materias.map((materia) => (
                    <tr key={materia.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-center">{materia.codigo}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{materia.nombre}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{materia.alumnos}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{materia.bloques}</td>

                      <td className="border border-gray-300 px-4 py-2 flex flex-row justify-center items-center">
                        <Link
                          to={`/materias/editar/${materia.id}`}
                          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 mr-2"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(materia.id)}
                          className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                         <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="border border-gray-300 px-4 py-2 text-center">
                      No hay materias disponibles
                    </td>
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
