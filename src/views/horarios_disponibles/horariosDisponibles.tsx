import axios from 'axios';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Profesor, HorarioDisponible } from '../../interfaces/interfaces';



export default function CrearHorarioDisponible() {
  // Tipado del estado para el formulario del horario
  const [horarioDisponible, setHorarioDisponible] = useState<HorarioDisponible>({
    id: '',
    dia: '',
    hora_inicio: '',
    hora_fin: '',
    profesor_id: '',
  });


  const [mensaje, setMensaje] = useState<string>('');
  const [profesores, setProfesores] = useState<Profesor[]>([]);

  // Función para obtener datos
  const fetchData = async () => {
    try {
      const profesoresResponse = await axios.get<Profesor[]>(`${host}/profesores`);
      setProfesores(profesoresResponse.data);
    } catch (error) {
      console.error('Error al cargar profesores:', error);
    }
  };

  // Uso de useEffect para cargar los profesores al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Manejo de cambios en el formulario (tipado de los eventos de cambio)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHorarioDisponible((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejo del envío del formulario (tipado del evento de envío)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const inicio = new Date(`1970-01-01T${horarioDisponible.hora_inicio}:00`);
    const fin = new Date(`1970-01-01T${horarioDisponible.hora_fin}:00`);

    // Validar que la hora_inicio es anterior a la hora_fin y que no sean iguales
    if (inicio >= fin) {
      alert("La hora de inicio debe ser anterior a la hora de fin y no pueden ser iguales.");
      return;
    }


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
              <label htmlFor="dia" className="block text-green-700 font-medium mb-2">Día de la Semana:</label>
              <select
                id="dia"
                name="dia"
                value={horarioDisponible.dia}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                required
              >
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
                value={horarioDisponible.hora_inicio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                required
              >
                <option value="06:00">6:00 AM</option>
                <option value="06:45">6:45 AM</option>
                <option value="07:30">7:30 AM</option>
                <option value="08:15">8:15 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="09:45">9:45 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:15">11:15 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="12:45">12:45 PM</option>
                <option value="13:30">1:30 PM</option>
                <option value="14:15">2:15 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="15:45">3:45 PM</option>
                <option value="16:30">4:30 PM</option>
                <option value="17:15">5:15 PM</option>
                <option value="18:00">6:00 PM</option>
              </select>
          </div>


            <div className="mb-4">
              <label htmlFor="hora_fin" className="block text-green-700 font-medium mb-2">Hora de Fin:</label>
              <select
                id="hora_fin"
                name="hora_fin"
                value={horarioDisponible.hora_fin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                required
              >
                <option value="06:00">6:00 AM</option>
                <option value="06:45">6:45 AM</option>
                <option value="07:30">7:30 AM</option>
                <option value="08:15">8:15 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="09:45">9:45 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:15">11:15 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="12:45">12:45 PM</option>
                <option value="13:30">1:30 PM</option>
                <option value="14:15">2:15 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="15:45">3:45 PM</option>
                <option value="16:30">4:30 PM</option>
                <option value="17:15">5:15 PM</option>
                <option value="18:00">6:00 PM</option>
              </select>
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
                Crear Horario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
