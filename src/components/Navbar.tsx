import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserIcon, BellIcon, CogIcon } from '@heroicons/react/24/solid';
import gestionutsLogo from '../../public/gestionuts.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
    {/* Barra superior*/}
      <div className="bg-gray-800 fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-4">
        <div className="flex items-center">
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {/* Icono para el menú hamburguesa bonito */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          
        </div>
        <div className="flex items-center space-x-4">
          <BellIcon className="h-6 w-6 text-white cursor-pointer" />{/* Para poner despues*/}
          <CogIcon className="h-6 w-6 text-white cursor-pointer" />{/* Para poner despues*/}
          <div className="relative">
            <UserIcon
              className="h-8 w-8 text-white hover:text-green-300 transition-transform duration-300 hover:scale-110 cursor-pointer"
              onClick={toggleProfileMenu}
            />
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                <div className="px-4 py-2 text-sm text-gray-700">
                  {user ? `Hola, ${user.email}` : 'Iniciar Sesión'}
                </div>
                <Link to="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-200 transition-colors duration-300">Perfil</Link>
                <Link to="/configuracion" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-200 transition-colors duration-300">Configuración</Link>
                <button onClick={handleSubmit} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-200 transition-colors duration-300">Cerrar Sesión</button>
              </div>
            )}
          </div>
        </div>
      </div>
{/* Barra lateral*/}
      <div className={`bg-gray-800 fixed left-0 top-16 h-full w-48 z-40 flex flex-col transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-4">
          <img src={gestionutsLogo} alt="Logo Gestion UTS" className="h-16 mb-6" />
        </div>
        <nav className="flex-grow">


          <div className="flex flex-col space-y-4 p-4">

            <Link to="/" className="text-green-100 hover:text-white transition-all duration-300 transform hover:scale-105">Profesores</Link>
            <Link to="/profesormateria" className="text-green-100 hover:text-white transition-all duration-300 transform hover:scale-105">Profesormateria</Link>
            <Link to="/vistahorariosdisponibles" className="text-green-100 hover:text-white transition-all duration-300 transform hover:scale-105">HorariosDisponibles</Link>
            <Link to="/vistaClases" className="text-green-100 hover:text-white transition-all duration-300 transform hover:scale-105">Clases</Link>
            <div className="relative">
              <button onClick={toggleSubMenu} className="text-green-100 hover:text-white transition-all duration-300 transform hover:scale-105">Gestión Académica</button>
              {isSubMenuOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  {['Materias', 'Salones'].map((item) => (
                    <Link to={`/${item.toLowerCase()}`} className="block text-green-100 hover:text-white transition-colors duration-300" key={item}>
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          
        </nav>
      </div>
    </>
  );
}
