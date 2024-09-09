import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { listarProfesores } from '../data/profesores.conexion';
import { Profesor } from '../interfaces/interfaces';
import { useEffect, useState } from 'react';

export default function Profesores() {
  const [profesores, setProfesores] = useState<Profesor[]>([]);

  console.log('User in localStorage:', localStorage.getItem('user'));

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
            <div className="bg-white rounded-lg shadow-lg" key={profe.cedula}>
              <div className="p-6 flex items-center">
                <img
                  src="/perfil.png"
                  alt="Perfil"
                  className="h-16 w-16 rounded-full border-2 border-green-700 mr-4"
                />
                <div>
                  <p className="font-semibold text-green-900">{profe.nombre}</p>
                  <p className="text-gray-600">Cédula: {profe.cedula}</p>
                  <p className="text-gray-600">Tipo de Contrato: {profe.tipo_contrato}</p>
                </div>
              </div>
              <ul className="flex justify-center gap-4 py-2 bg-green-50 border-t border-green-200 rounded-b-lg">
                <li className="text-gray-700">Materia 1</li>
                <li className="text-gray-700">Materia 2</li>
                <li className="text-gray-700">Materia 3</li>
              </ul>
            </div>
          ))}
        </div>

        <div className="w-full max-w-screen-lg mt-10 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Gestión de Horarios y Salones en la UTS</h1>
          <p className="text-gray-700 text-lg">
            Gestionar los horarios y la asignación de salones para las clases en los salones del programa de sistemas
            de las UTS donde presentan una serie de dificultades que afectan tanto a los directores académicos como a
            los estudiantes y profesores. Actualmente, la planificación se realiza de manera manual o con herramientas
            poco eficientes llevando a veces a un uso inadecuado de los recursos disponibles. Estas limitaciones generan
            frustración entre los estudiantes y profesores debido a la falta de disponibilidad de aulas, falta de
            herramientas y horarios adecuados, afectando negativamente la calidad de la educación impartida.
          </p>
          <p className="text-gray-700 text-lg mt-4">UWU</p>
        </div>
      </div>
    </>
  );
}
