import axios from 'axios';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Clase, Materia, Salon, Profesor } from '../../interfaces/interfaces';
import { motion } from 'framer-motion';
import { PlusIcon, PencilIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function CrearClase() {
  const { id } = useParams<{ id: string }>();
  const [clase, setClase] = useState<Clase>({
    grupo: '',
    dia_semana: '',
    hora_inicio: '',
    hora_fin: '',
    alumnos: 0,
    materia_id: 0,
    profesor_id: 0,
    salon_id: 0,
  });

  const [mensaje, setMensaje] = useState<string>('');
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [salones, setSalones] = useState<Salon[]>([]);
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProfesores, setFilteredProfesores] = useState<Profesor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [materiasResponse, salonesResponse, profesoresResponse] = await Promise.all([
          axios.get(`${host}/materias`),
          axios.get(`${host}/salones`),
          axios.get(`${host}/profesores`),
        ]);

        setMaterias(materiasResponse.data);
        setSalones(salonesResponse.data);
        setProfesores(profesoresResponse.data);
        setFilteredProfesores(profesoresResponse.data);

        if (id) {
          const claseResponse = await axios.get(`${host}/clases/${id}`);
          setClase(claseResponse.data);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setMensaje('Error al cargar datos');
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const filtered = profesores.filter(profesor =>
      profesor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfesores(filtered);
  }, [searchTerm, profesores]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClase((prevState) => ({
      ...prevState,
      [name]: name === 'alumnos' || name === 'materia_id' || name === 'profesor_id' || name === 'salon_id' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const inicio = new Date(`1970-01-01T${clase.hora_inicio}:00`);
    const fin = new Date(`1970-01-01T${clase.hora_fin}:00`);

    if (inicio >= fin) {
      alert("La hora de inicio debe ser anterior a la hora de fin y no pueden ser iguales.");
      return;
    }

    try {
      if (id) {
        await axios.put(`${host}/clases/${id}`, clase);
      } else {
        await axios.post(`${host}/clases`, clase);
      }
      setClase({
        grupo: '',
        dia_semana: '',
        hora_inicio: '',
        hora_fin: '',
        alumnos: 0,
        materia_id: 0,
        profesor_id: 0,
        salon_id: 0,
      });
      setMensaje('Clase creada/actualizada exitosamente');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setMensaje('Error al enviar los datos');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pl-4 md:pl-16 lg:pl-52 pr-6"
      style={{
        backgroundImage: `url('https://c.wallhere.com/photos/64/fc/3840x2160_px_animals_artwork_Clear_Sky_Deer_digital_art_drawing_Firewatch-516653.jpg!d')`,
      }}
    >
      <Navbar />
      <div className="relative min-h-screen flex flex-col items-center pt-32">
        <motion.div 
          className="w-full max-w-md p-6 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-md"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Crear Clase</h2>

          {mensaje && (
            <div className={`mb-4 p-4 text-center text-white rounded ${mensaje.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="grupo" className="block text-green-700 font-medium mb-2">Grupo:</label>
              <input
                type="text"
                id="grupo"
                name="grupo"
                value={clase.grupo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese el grupo"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dia_semana" className="block text-green-700 font-medium mb-2">Día de la Semana:</label>
              <select
                id="dia_semana"
                name="dia_semana"
                value={clase.dia_semana}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                required
              >
                <option value="">Selecciona un dia</option>
                <option value="lunes">Lunes</option>
                <option value="martes">Martes</option>
                <option value="miercoles">Miércoles</option>
                <option value="jueves">Jueves</option>
                <option value="viernes">Viernes</option>
                <option value="sabado">Sábado</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="hora_inicio" className="block text-green-700 font-medium mb-2">Hora de inicio:</label>
              <select
                id="hora_inicio"
                name="hora_inicio"
                value={clase.hora_inicio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                required
              >
                <option value="">Selecciona una hora</option>
                {generateTimeSlots().map(slot => (
                  <option key={slot.value} value={slot.value}>{slot.display}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="hora_fin" className="block text-green-700 font-medium mb-2">Hora de Fin:</label>
              <select
                id="hora_fin"
                name="hora_fin"
                value={clase.hora_fin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                required
              >
                <option value="">Selecciona una hora</option>
                {generateTimeSlots().map(slot => (
                  <option key={slot.value} value={slot.value}>{slot.display}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="alumnos" className="block text-green-700 font-medium mb-2">Número de Alumnos:</label>
              <input
                type="number"
                id="alumnos"
                name="alumnos"
                value={clase.alumnos}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese el número de alumnos"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="materia_id" className="block text-green-700 font-medium mb-2">Materia:</label>
              <select
                id="materia_id"
                name="materia_id"
                value={clase.materia_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                required
              >
                <option value={0}>Seleccione una materia</option>
                {materias.map(materia => (
                  <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="profesor_id" className="block text-green-700 font-medium mb-2">Profesor:</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Buscar profesor..."
              />
              <div className="max-h-40 overflow-y-auto border border-green-300 rounded mt-2">
                {filteredProfesores.map(profesor => (
                  <div key={profesor.id} className="flex items-center justify-between p-2 hover:bg-green-200 cursor-pointer" onClick={() => setClase({ ...clase, profesor_id: profesor.id })}>
                    <span>{profesor.nombre}</span>
                    <PlusIcon className="w-5 h-5 text-green-700" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="salon_id" className="block text-green-700 font-medium mb-2">Salón:</label>
              <select
                id="salon_id"
                name="salon_id"
                value={clase.salon_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                required
              >
                <option value={0}>Seleccione un salón</option>
                {salones.map(salon => (
                  <option key={salon.id} value={salon.id}>{salon.codigo}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="flex items-center px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition duration-300"
              >
                {id ? <PencilIcon className="w-5 h-5 mr-2" /> : <PlusIcon className="w-5 h-5 mr-2" />}
                {id ? 'Actualizar Clase' : 'Crear Clase'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

function generateTimeSlots() {
  const slots = [];
  for (let hour = 6; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      const display = `${hour}:${minute === 0 ? '00' : minute}`;
      slots.push({ value, display });
    }
  }
  return slots;
}
