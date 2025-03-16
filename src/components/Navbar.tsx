import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  UserIcon, 
  BellIcon, 
  CogIcon, 
  ChevronDownIcon,
  AcademicCapIcon,
  BookOpenIcon,
  UsersIcon,
  CalendarIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import gestionutsLogo from '../../public/logo1.png';
import calidad from '../../public/calidad.png'; 

const MenuItem = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'bg-[#0B4A75] text-white' 
          : 'text-white hover:bg-green-600 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </Link>
  );
};

const SubMenu = ({ title, items, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-white hover:bg-[#0B4A75] hover:text-white rounded-lg transition-all duration-300"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5" />
          <span>{title}</span>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-4 mt-2 space-y-2"
          >
            {items.map((item) => (
              <MenuItem key={item.to} to={item.to} icon={item.icon}>
                {item.label}
              </MenuItem>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const profileMenuRef = useRef(null);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }, [logout, navigate]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleClickOutside = (event) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      const mockNotifications = [
        { id: 1, message: 'Nueva clase asignada' },
        { id: 2, message: 'Recordatorio: Reunión de algo' },
      ];
      setNotifications(mockNotifications);
    };
    fetchNotifications();
  }, []);

  const menuItems = [
    { to: '/', label: 'Profesores', icon: UsersIcon },
    { to: '/vistaClases', label: 'Clases', icon: BookOpenIcon },
    {
      title: 'Gestión',
      icon: AcademicCapIcon,
      items: [
        { to: '/materias', label: 'Materias', icon: ClipboardDocumentListIcon },
        { to: '/salones', label: 'Salones', icon: BookOpenIcon },
        { to: '/vistahorariosdisponibles', label: 'Horarios', icon: CalendarIcon },
        { to: '/profesormateria', label: 'Profesor Materia', icon: UsersIcon },
      ],
    },
  ];

  return (
    <>
      <header className="bg-white fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <button className="md:hidden text-white" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <h1>  <img src={calidad} alt="Logo Gestion UTS" className="h-16 " /></h1>
          <h1>  <img src={gestionutsLogo} alt="Logo Gestion UTS" className="h-14 " /></h1>
         
        </div>
        <div className="flex items-center space-x-6">
          
          <div className="relative" ref={profileMenuRef}>
            <UserIcon
              className="h-8 w-8 text-gray-900 hover:text-indigo-300 transition-transform duration-300 hover:scale-110 cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-expanded={isProfileOpen}
            />
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2"
                >
                  <div className="px-4 py-2 text-sm text-gray-900">
                    {user ? `Hola, ${user.email}` : 'Iniciar Sesión'}
                  </div>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-900  transition-colors duration-300">Cerrar Sesión</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {user.rol === 'admin' && (
        <aside className={`bg-[#0B4A75]  fixed left-0 top-16 h-full w-48 z-40 flex flex-col transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 shadow-xl`}>
          <div className="p-4 flex justify-center">
            
          </div>
          <nav className="flex-grow overflow-y-auto ">
            <div className="flex flex-col text-gray-800 space-y-2 p-4">
              {menuItems.map((item) => 
                item.items ? (
                  <SubMenu key={item.title} title={item.title} items={item.items} icon={item.icon} />
                ) : (
                  <MenuItem key={item.to} to={item.to} icon={item.icon}>
                    {item.label}
                  </MenuItem>
                )
              )}
            </div>
          </nav>
        </aside>
      )}
    </>
  );
    }
