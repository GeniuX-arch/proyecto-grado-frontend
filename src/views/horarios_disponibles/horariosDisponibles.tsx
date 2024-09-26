import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';

export default function CrearHorarioDisponible() {
  const [horarioDisponible, setHorarioDisponible] = useState({
    id: '',
    dia: '',
    hora_inicio: '',
    hora_fin: '',
    profesor_id: '',
  });

  const [mensaje, setMensaje] = useState<string>('');
  const [profesores, setProfesores] = useState([]);

  const host = 'http://localhost:8000/api';

  // Función para obtener datos
  const fetchData = async () => {
    try {
      const [profesoresResponse] = await Promise.all([
        axios.get(`${host}/profesores`),
      ]);
      setProfesores(profesoresResponse.data);
    } catch (error) {
      console.error('Error al cargar profesores:', error);
    }
  };

  // Uso de useEffect para cargar los profesores al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHorarioDisponible((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejo del envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${host}/horarios_disponibles`, horarioDisponible);
      console.log('Horario creado con éxito:', response.data);
      setMensaje('Horario creado con éxito.');
      // Restablecer el formulario si es necesario
      setHorarioDisponible({
        id: '',
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

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat"
         style={{
           backgroundImage: `url('https://c.wallhere.com/photos/64/fc/3840x2160_px_animals_artwork_Clear_Sky_Deer_digital_art_drawing_Firewatch-516653.jpg!d')`,
         }}>
      <Navbar />
      <div className="relative min-h-screen flex flex-col items-center pt-32">
        <div className="w-full max-w-md p-6 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Crear Horario Disponible</h2>

          {mensaje && (
            <div className={`mb-4 p-4 text-center text-white rounded ${mensaje.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Día */}
            <div className="mb-4">
              <label htmlFor="dia" className="block text-green-700 font-medium mb-2">Día:</label>
              <input
                type="text"
                id="dia"
                name="dia"
                value={horarioDisponible.dia}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
              />
            </div>
            {/* Hora de Inicio */}
            <div className="mb-4">
              <label htmlFor="hora_inicio" className="block text-green-700 font-medium mb-2">Hora de Inicio:</label>
              <input
                type="time"
                id="hora_inicio"
                name="hora_inicio"
                value={horarioDisponible.hora_inicio}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
              />
            </div>
            {/* Hora de Fin */}
            <div className="mb-4">
              <label htmlFor="hora_fin" className="block text-green-700 font-medium mb-2">Hora de Fin:</label>
              <input
                type="time"
                id="hora_fin"
                name="hora_fin"
                value={horarioDisponible.hora_fin}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
              />
            </div>
            {/* Profesor */}
            <div className="mb-4">
              <label htmlFor="profesor_id" className="block text-green-700 font-medium mb-2">Profesor:</label>
              <select
                id="profesor_id"
                name="profesor_id"
                value={horarioDisponible.profesor_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                required
              >
                <option value="">Seleccione un profesor</option>
                {profesores.map((profesor) => (
                  <option key={profesor.cedula} value={profesor.cedula}>
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
                Crear Horario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
