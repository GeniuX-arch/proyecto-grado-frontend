import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';
import { useContext, useEffect } from 'react';

export default function Profesores() {
  //redireccionar
    const { status } = useContext(AuthContext);

     const navigate = useNavigate();
  if (status !== 'authenticated') {
      navigate("/login");
  }
  return (
    <>
      <Navbar />
      <div className='min-h-screen flex flex-col items-center pt-24'>
        <Link to="/profesor/crear" className="text-blue-800 hover:underline mb-4">Crear Nuevo Profesor</Link>
        <h1 className='text-3xl font-bold text-gray-1000 mb-6'>Listado de Profesores</h1>

        <div className='w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div className='bg-gray-100 rounded-md shadow-md'>
            <div className='p-6 flex items-center'>
              <img src="../../public/perfil.png" alt="" className='h-16 w-16 rounded-full mr-4' />
              <div>
                <p className='font-semibold text-gray-800'>12164888791</p>
                <p className="text-gray-600">Pepito Perez</p>
                <p className="text-gray-600">Tipo de Contrato: Tiempo Completo</p>
              </div>
            </div>
            <ul className='flex justify-center gap-4 py-2 border-t border-gray-200'>
              <li className="text-gray-600">Materia 1</li>
              <li className="text-gray-600">Materia 2</li>
              <li className="text-gray-600">Materia 3</li>
            </ul>
          </div>

          <div className='bg-gray-100 rounded-md shadow-md'>
            <div className='p-6 flex items-center'>
              <img src="../../public/perfil.png" alt="" className='h-16 w-16 rounded-full mr-4' />
              <div>
                <p className='font-semibold text-gray-800'>12164888791</p>
                <p className="text-gray-600">Pepito Perez</p>
                <p className="text-gray-600">Tipo de Contrato: Tiempo Parcial</p>
              </div>
            </div>
            <ul className='flex justify-center gap-4 py-2 border-t border-gray-200'>
              <li className="text-gray-600">Materia 1</li>
              <li className="text-gray-600">Materia 2</li>
              <li className="text-gray-600">Materia 3</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
