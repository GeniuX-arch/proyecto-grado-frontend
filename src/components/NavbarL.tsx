import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import gestionutsLogo from '../../public/gestionuts.png'; // Asegúrate de que la ruta sea correcta

export default function NavbarL() {
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
    <div className="flex">
      {/* Navbar Lateral */}
      <div className="bg-gray-800 w-64 h-screen fixed top-0 left-0 shadow-lg">
        <div className="flex items-center justify-center h-16">
          <img src={gestionutsLogo} alt="Logo" className="h-12" />
        </div>
        <nav className="mt-4">
          <Link to="/" className="block px-4 py-2 text-white hover:bg-green-500">
            Profesores
          </Link>
          <Link to="/profesormateria" className="block px-4 py-2 text-white hover:bg-green-500">
            Profesormateria
          </Link>
          <Link to="/vistahorariosdisponibles" className="block px-4 py-2 text-white hover:bg-green-500">
            HorariosDisponibles
          </Link>
          <Link to="/vistaClases" className="block px-4 py-2 text-white hover:bg-green-500">
            Clases
          </Link>
        </nav>
      </div>

      {/* Navbar Superior */}
      <div className="flex-1 ml-64">
        <div className="bg-gray-900 backdrop-filter backdrop-blur-lg shadow-lg fixed top-0 left-0 w-full z-50">
          <nav className="flex items-center justify-between p-6">
            <div className="flex items-center text-white">
              {/* Aquí va el logo si lo deseas en el navbar superior */}
            </div>

            <div className="flex items-center">
              <div className="relative">
                <UserIcon
                  className="h-10 w-10 text-white hover:text-green-300 transition-transform duration-500 hover:scale-110 cursor-pointer"
                  onClick={toggleProfileMenu}
                />
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white bg-opacity-80 rounded-md shadow-lg py-2">
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-200 hover:bg-opacity-70 transition-colors duration-300 bg-transparent"
                    >
                      {user ? `que tal, ${user.email}` : 'Iniciar Sesión'}
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
          </nav>
        </div>
        <div className="pt-16"> {/* Espacio para el navbar superior */}
          {/* Aquí va el contenido principal */}
        </div>
      </div>
    </div>
  );
}
