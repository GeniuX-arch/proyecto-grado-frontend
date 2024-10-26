import axios from 'axios';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Profesor, HorarioDisponible } from '../../interfaces/interfaces';
import { motion } from 'framer-motion';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function CrearHorarioDisponible() {
  const [horarioDisponible, setHorarioDisponible] = useState<HorarioDisponible>({
    dia: '',
    hora_inicio: '',
    hora_fin: '',
    profesor_id: '',
  });

  const [mensaje, setMensaje] = useState<string>('');
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProfesores, setFilteredProfesores] = useState<Profesor[]>([]);

  const fetchData = async () => {
    try {
      const profesoresResponse = await axios.get<Profesor[]>(`${host}/profesores`);
      setProfesores(profesoresResponse.data);
      setFilteredProfesores(profesoresResponse.data);
    } catch (error) {
      console.error('Error al cargar profesores:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = profesores.filter(profesor =>
      profesor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfesores(filtered);
  }, [searchTerm, profesores]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHorarioDisponible((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour < 24; hour++) {
      slots.push({
        value: `${String(hour).padStart(2, '0')}:00`,
        display: `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`
      });
      slots.push({
        value: `${String(hour).padStart(2, '0')}:45`,
        display: `${hour % 12 === 0 ? 12 : hour % 12}:45 ${hour < 12 ? 'AM' : 'PM'}`
      });
    }
    return slots;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inicio = new Date(`1970-01-01T${horarioDisponible.hora_inicio}:00`);
    const fin = new Date(`1970-01-01T${horarioDisponible.hora_fin}:00`);

    if (inicio >= fin) {
      alert("La hora de inicio debe ser anterior a la hora de fin y no pueden ser iguales.");
      return;
    }

    try {
      const horarioData = {
        ...horarioDisponible,
        profesor_id: Number(horarioDisponible.profesor_id),
      };
      
      await axios.post(`${host}/horarios_disponibles`, horarioData);
      setMensaje('Horario creado con éxito.');
      setHorarioDisponible({
        dia: '',
        hora_inicio: '',
        hora_fin: '',
        profesor_id: '',
      });
    } catch (error) {
      console.error('Error al crear horario:', error);
      setMensaje('Error al crear horario.');
    }
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-700 min-h-screen bg-cover bg-center flex flex-col items-center justify-center pl-4 md:pl-16 lg:pl-52 pr-6 pt-16">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg p-10 bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Crear Horario Disponible</h2>

        {mensaje && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`mb-4 p-4 text-center text-white rounded ${mensaje.includes('Error') ? 'bg-red-600' : 'bg-green-600'}`}
          >
            {mensaje}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Día */}
          <div className="mb-6">
            <label htmlFor="dia" className="block text-cyan-300 font-medium mb-2">Día de la Semana:</label>
            <select
              id="dia"
              name="dia"
              value={horarioDisponible.dia}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="lunes">Lunes</option>
              <option value="martes">Martes</option>
              <option value="miercoles">Miércoles</option>
              <option value="jueves">Jueves</option>
              <option value="viernes">Viernes</option>
              <option value="sabado">Sábado</option>
            </select>
          </div>

          {/* Hora de inicio */}
          <div className="mb-6">
            <label htmlFor="hora_inicio" className="block text-cyan-300 font-medium mb-2">Hora de inicio:</label>
            <select
              id="hora_inicio"
              name="hora_inicio"
              value={horarioDisponible.hora_inicio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            >
              <option value="">Selecciona una opción</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot.value}>{slot.display}</option>
              ))}
            </select>
          </div>

          {/* Hora de fin */}
          <div className="mb-6">
            <label htmlFor="hora_fin" className="block text-cyan-300 font-medium mb-2">Hora de Fin:</label>
            <select
              id="hora_fin"
              name="hora_fin"
              value={horarioDisponible.hora_fin}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            >
              <option value="">Selecciona una opción</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot.value}>{slot.display}</option>
              ))}
            </select>
          </div>

          {/* Buscador de Profesores */}
          <div className="mb-4">
            <label htmlFor="search" className="block text-cyan-300 font-medium mb-2">Buscar Profesor:</label>
            <div className="relative">
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Buscar profesor..."
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Profesor */}
          <div className="mb-6">
            <label htmlFor="profesor_id" className="block text-cyan-300 font-medium mb-2">Profesor:</label>
            <select
              id="profesor_id"
              name="profesor_id"
              value={horarioDisponible.profesor_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            >
              <option value="">Seleccione un profesor</option>
              {filteredProfesores.map((profesor) => (
                <option key={profesor.id} value={profesor.id}>
                  {profesor.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              {horarioDisponible.profesor_id ? 'Actualizar' : 'Enviar'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}