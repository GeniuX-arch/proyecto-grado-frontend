import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className="bg-gray-900 backdrop-filter backdrop-blur-lg shadow-lg fixed w-full z-50">
      <nav className="flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center text-white">
          <span className="font-bold text-xl tracking-wide">USUARIO ADMIN</span>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-green-200 border-green-500 hover:text-white hover:border-white"
            onClick={toggleMenu}
          >
            <svg
              className="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full flex-grow lg:flex lg:items-center lg:justify-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}
        >
          <div className="text-lg lg:flex-grow text-center">
            <Link
              to="/horario"
              className="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mx-6 transition-all duration-300 transform hover:scale-105"
            >
              Horario
            </Link>
            <Link
              to="/profesores"
              className="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mx-6 transition-all duration-300 transform hover:scale-105"
            >
              
              Profesores
            </Link>

            <Link
              to="/profesormateria"
              className="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mx-6 transition-all duration-300 transform hover:scale-105"
            >
              
              Profesormateria
            </Link>

            <Link
              to="/vistahorariosdisponibles"
              className="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mx-6 transition-all duration-300 transform hover:scale-105"
            >
              
              HorariosDisponibles
            </Link>

            

            <Link
              to="/vistaClases"
              className="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mx-6 transition-all duration-300 transform hover:scale-105"
            >
              
              clases
            </Link>
            <div className="relative inline-block mt-4 lg:mt-0 mx-6">
              <button
                onClick={toggleSubMenu}
                className="text-green-100 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Gestión Académica
              </button>
              {isSubMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50">
                  {['Materias', 'Salones'].map((item) => (
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="block px-4 py-2 text-green-100 hover:bg-green-500 hover:text-white transition-colors duration-300"
                      key={item}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mt-4 lg:mt-0">
            <div className="relative">
              <img
                src="/perfil.png"
                alt="Perfil"
                className="h-10 w-10 lg:h-16 lg:w-16 rounded-full border-2 border-white hover:border-green-300 transition-transform duration-500 hover:scale-110 cursor-pointer"
                onClick={toggleProfileMenu}
              />
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white bg-opacity-80 rounded-md shadow-lg py-2">
                  <Link
                    to="/perfil"
                    className="block px-4 py-2 text-gray-700 hover:bg-green-200 hover:bg-opacity-70 transition-colors duration-300 bg-transparent"
                  >
                    {user ? `que tal, , ${user.email}` : 'Iniciar Sesión'}
                  </Link>
                  <Link
                    to="/configuracion"
                    className="block px-4 py-2 text-gray-700 hover:bg-green-200 transition-colors duration-300"
                  >
                    Configuración
                  </Link>
                  <button
                    onClick={handleSubmit}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-200 transition-colors duration-300"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
