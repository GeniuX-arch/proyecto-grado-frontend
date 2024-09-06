import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
<<<<<<< HEAD
const { logout } = useAuth();
  const navegate = useNavigate();
=======
  const navigate = useNavigate();
  const { handleLogOut } = useContext(AuthContext);
>>>>>>> ea9b185b70b472cc126662f1ae9feb2917a8d731
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    try {
<<<<<<< HEAD
      logout();
      navegate('/login')
=======
      await handleLogOut();
      navigate('/login');
>>>>>>> ea9b185b70b472cc126662f1ae9feb2917a8d731
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-green-700 shadow-lg">
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
              <div className="flex flex-col items-center">
                <svg
                  className="w-8 h-8 mb-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-9 4h9m-6 4h6m4-12H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2z"></path>
                </svg>
                <span>Horario</span>
              </div>
            </Link>
            <Link
              to="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mx-6 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex flex-col items-center">
                <svg
                  className="w-8 h-8 mb-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 10-8 0v4M5 11h14m-7 8a2 2 0 002-2H9a2 2 0 002 2z"></path>
                </svg>
                <span>Profesores</span>
              </div>
            </Link>
          </div>
          <div className="text-center mt-4 lg:mt-0">
            <a
              onClick={handleSubmit}
              className="hover:cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-green-700 hover:bg-white transition-colors duration-300"
            >
              Cerrar Sesión
            </a>
          </div>
          <div className="ml-4 flex items-center justify-center">
            <Link to="/perfil">
              <img
                src="/perfil.png"
                alt="Perfil"
                className="h-10 w-10 lg:h-16 lg:w-16 rounded-full border-2 border-white hover:border-green-300 transition-transform duration-500 hover:scale-110"
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
