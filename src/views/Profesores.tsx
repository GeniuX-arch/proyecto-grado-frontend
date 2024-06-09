
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
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
      <div className='min-h-screen flex flex-col items-center pt-24'>
        <Link to="/profesor/crear" className="text-blue-800 hover:underline mb-4">Crear Nuevo Profesor</Link>
        <h1 className='text-3xl font-bold text-gray-1000 mb-6'>Listado de Profesores</h1>

        <div className='w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {profesores.map(profe => (
            <div className='bg-gray-100 rounded-md shadow-md' key={profe.cedula}>
              <div className='p-6 flex items-center'>
                <img src="/perfil.png" alt="Perfil" className='h-16 w-16 rounded-full mr-4' />
                <div>
                  <p className='font-semibold text-gray-800'>{profe.cedula}</p>
                  <p className="text-gray-600">{profe.nombre}</p>
                  <p className="text-gray-600">Tipo de Contrato: {profe.tipo_contrato}</p>
                </div>
              </div>
              <ul className='flex justify-center gap-4 py-2 border-t border-gray-200'>
                <li className="text-gray-600">Materia 1</li>
                <li className="text-gray-600">Materia 2</li>
                <li className="text-gray-600">Materia 3</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
