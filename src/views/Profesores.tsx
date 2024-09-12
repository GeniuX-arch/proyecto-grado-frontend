import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { listarProfesores } from '../data/profesores.conexion';
import { Profesor } from '../interfaces/interfaces';
import { useEffect, useState } from 'react';

export default function Profesores() {
  const [profesores, setProfesores] = useState<Profesor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lista: Profesor[] = await listarProfesores();
        setProfesores(lista);
      } catch (error) {
        console.error('Error al obtener la lista de profesores:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center pt-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://c.wallhere.com/photos/64/fc/3840x2160_px_animals_artwork_Clear_Sky_Deer_digital_art_drawing_Firewatch-516653.jpg!d')`,
        }}
      >
        <div className="w-full max-w-screen-lg mb-6 flex justify-between items-center bg-opacity-80 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
          <h2 className="text-3xl font-bold text-white">Gestión de Profesores</h2>
          <Link
            to="/profesor/crear"
            className="bg-green-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-800 transition-colors duration-300"
          >
            Crear Nuevo Profesor
          </Link>
        </div>

        <div className="w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-opacity-80 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
          {profesores.map((profe) => (
            <div className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" key={profe.cedula}>
              <div className="p-6 flex items-center">
                <img
                  src={ "/perfil.png"} //podemos poner una de la base de datos profe.foto ||
                  alt="Perfil"
                  className="h-16 w-16 rounded-full border-2 border-green-700 mr-4"
                />
                <div className="w-full">
                  <p className="font-semibold text-green-200">{profe.nombre}</p>
                  <p className="text-gray-200">Cédula: {profe.cedula}</p>
                  <p className="text-gray-200 break-words whitespace-normal">
                    Tipo de Contrato: {profe.tipo_contrato}
                  </p>
                </div>
              </div>
              <ul className="flex justify-center gap-4 py-2 bg-green-600 border-t border-green-600 rounded-b-lg">
                <li className="text-gray-300">Materia 1</li>
                <li className="text-gray-300">Materia 2</li>
                <li className="text-gray-300">Materia 3</li>
              </ul>
              <div className="p-4 flex justify-between">
                <Link
                  to={`/profesor/editar/${profe.cedula}`}
                  className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
