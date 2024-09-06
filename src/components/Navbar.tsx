import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useAuth } from '../context/AuthContext';


export default function Navbar() {
const { logout } = useAuth();
  const navegate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async () => {
    try {
      logout();
      navegate('/login')
    } catch (error) {
      console.error(error);
    }
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-800">
      <nav className="flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">USUARIO ADMIN</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white" onClick={toggleMenu}>
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <div className="text-sm lg:flex-grow">
            <Link to="/horario" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
              Horario
            </Link>
            <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
              Profesores
            </Link>
          </div>
          <div>
            <a onClick={handleSubmit} className="hover:cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-900 hover:bg-white mt-4 lg:mt-0">
              Cerrar Sesion
            </a>
          </div>
          <div className="ml-4 flex items-center">
            <Link to="/perfil">
              <img src="/perfil.png" alt="Perfil" className={`h-6 w-6 lg:h-12 lg:w-12 transition-transform duration-500 ${isOpen ? 'lg:translate-x-full' : ''}`} />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
