import axios from 'axios';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Clase, Materia, Salon, Profesor } from '../../interfaces/interfaces';
import { motion } from 'framer-motion';

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
    const [showListProfesores, setShowListProfesores] = useState(true);
      const [showListMaterias, setShowListMaterias] = useState(true);

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
    console.log(inicio)
    const fin = new Date(`1970-01-01T${clase.hora_fin}:00`);

    console.log(fin)
    if (inicio >= fin) {
      alert("La hora de inicio debe ser anterior a la hora de fin y no pueden ser iguales.");
      return;
    }

    try {
      if (id) {
        await axios.put(`${host}/clases/${id}`, clase);
        setMensaje('Clase actualizada exitosamente');
      } else {
        await axios.post(`${host}/clases`, clase);
        setMensaje('Clase creada exitosamente');
      }

      setClase({
        grupo: '',
        dia_semana: '',
        hora_inicio: '',
        hora_fin: '',
        alumnos: 0,
        materia_nombre: '',
        profesor_nombre: '',
        salon_codigo: '',
      });
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setMensaje('Error al enviar los datos');
    }
  };

  const slotsInicio: string[] = [
  "06:00", "06:45", "07:30", "08:15", "09:00", "09:45", "10:30", "11:15", 
  "12:00", "12:45", "13:30", "14:15", "15:00", "15:45", "16:30", "17:15", 
  
];
  const slotsFin: string[] = [
  "06:45", "07:30", "08:15", "09:00", "09:45", "10:30", "11:15", 
  "12:00", "12:45", "13:30", "14:15", "15:00", "15:45", "16:30", "17:15", 
  "18:00"
];


  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-700 min-h-screen bg-cover bg-center flex flex-col items-center justify-center pl-4 md:pl-16 lg:pl-52 pr-6 pt-16">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg p-10 bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          {id ? 'Editar Clase' : 'Crear Clase'}
        </h2>

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
          {/* Grupo */}
          <div className="mb-6">
            <label htmlFor="grupo" className="block text-cyan-300 font-medium mb-2">Grupo:</label>
            <input
              type="text"
              id="grupo"
              name="grupo"
              value={clase.grupo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          {/* Día de la semana */}
          <div className="mb-6">
            <label htmlFor="dia_semana" className="block text-cyan-300 font-medium mb-2">Día de la Semana:</label>
            <select
              id="dia_semana"
              name="dia_semana"
              value={clase.dia_semana}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            >
              <option value="">Selecciona un día</option>
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
            <label htmlFor="hora_inicio" className="block text-cyan-300 font-medium mb-2">Hora de Inicio:</label>
            <select
              id="hora_inicio"
              name="hora_inicio"
              value={clase.hora_inicio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            >
              <option value="">Selecciona una hora</option>
              {slotsInicio.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          {/* Hora de fin */}
          <div className="mb-6">
            <label htmlFor="hora_fin" className="block text-cyan-300 font-medium mb-2">Hora de Fin:</label>
            <select
              id="hora_fin"
              name="hora_fin"
              value={clase.hora_fin}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            >
              <option value="">Selecciona una hora</option>
              {slotsFin.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          {/* Número de alumnos */}
          <div className="mb-6">
            <label htmlFor="alumnos" className="block text-cyan-300 font-medium mb-2">Número de Alumnos:</label>
            <input
              type="number"
              id="alumnos"
              name="alumnos"
              value={clase.alumnos}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          {/* Materia */}
          <div className="mb-6">
            <label htmlFor="materia_id" className="block text-cyan-300 font-medium mb-2">Materia:</label>
            <select
              id="materia_id"
              name="materia_id"
              value={clase.materia_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            >
              <option value={0}>Seleccione una materia</option>
              {materias.map(materia => (
                <option key={materia.id} value={materia.id}>{materia.nombre}</option>
              ))}
            </select>
          </div>

          {/* Profesor */}
    <div className="mb-6">
      <label htmlFor="profesor" className="block text-cyan-300 font-medium mb-2">Profesor:</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowListProfesores(true); // Show the list when the user starts typing
        }}
        placeholder="Buscar profesor"
        className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-2"
      />
      <div className="max-h-40 overflow-y-auto border border-gray-700 bg-gray-900 text-white rounded-lg">
        {searchTerm && filteredProfesores.length > 0 && showListProfesores && (
          filteredProfesores.map(profesor => (
            <div 
              key={profesor.id} 
              onClick={() => {
                setClase({ ...clase, profesor_id: profesor.id });
                setSearchTerm(profesor.nombre); // Completa el input con el nombre del profesor
                setShowListProfesores(false); // Hide the list after selecting a profesor
              }}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            >
              {profesor.nombre}
            </div>
          ))
        )}
      </div>
    </div>


          {/* Salón */}
          <div className="mb-6">
            <label htmlFor="salon_id" className="block text-cyan-300 font-medium mb-2">Salón:</label>
            <select
              id="salon_id"
              name="salon_id"
              value={clase.salon_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              {id ? 'Actualizar Clase' : 'Crear Clase'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}