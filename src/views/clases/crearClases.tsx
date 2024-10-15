import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Clase, Materia, Salon, Profesor } from '../../interfaces/interfaces';

export default function CrearClase() {
  const [clase, setClase] = useState<Clase>({
    grupo: '',
    dia_semana: '',
    hora_inicio: '',
    hora_fin: '',
    alumnos: 0,
    materia_id: 0,
    profesor_id:0,
    salon_id: 0,
  });

  const [mensaje, setMensaje] = useState<string>('');
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [salones, setSalones] = useState<Salon[]>([]);
  const [profesores, setProfesores] = useState<Profesor[]>([]);

  useEffect(() => {
    // Cargar las materias y los salones desde la API
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
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Asegurarse de manejar correctamente los valores numéricos
    setClase((prevState) => ({
      ...prevState,
      [name]: name === 'alumnos' || name === 'materia_id' || name === 'profesor_id' || name === 'salon_id' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
      const inicio = new Date(`1970-01-01T${clase.hora_inicio}:00`);
    const fin = new Date(`1970-01-01T${clase.hora_fin}:00`);

    // Validar que la hora_inicio es anterior a la hora_fin y que no sean iguales
    if (inicio >= fin) {
      alert("La hora de inicio debe ser anterior a la hora de fin y no pueden ser iguales.");
      return;
    }

    try {
      await axios.post(`${host}/clases`, clase);
      setClase({
        grupo: '',
        dia_semana: '',
        hora_inicio: '',
        hora_fin: '',
        alumnos: 0,
        materia_id: 0,
        profesor_id:0,
        salon_id: 0,
      });
      setMensaje('Clase creada exitosamente');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setMensaje('Error al enviar los datos');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://c.wallhere.com/photos/64/fc/3840x2160_px_animals_artwork_Clear_Sky_Deer_digital_art_drawing_Firewatch-516653.jpg!d')`,
      }}
    >
      <Navbar />
      <div className="relative min-h-screen flex flex-col items-center pt-32">
        <div className="w-full max-w-md p-6 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-md">
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
                value={clase.hora_fin}
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
                {materias.map((materia) => (
                  <option key={materia.id} value={materia.id}>
                    {materia.nombre}
                  </option>
                ))}
              </select>
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
                {salones.map((salon) => (
                  <option key={salon.id} value={salon.id}>
                    {salon.tipo} (Capacidad: {salon.capacidad_alumnos})
                  </option>
                ))}
              </select>
            </div>
             <div className="mb-4">
              <label htmlFor="profesor_id" className="block text-green-700 font-medium mb-2">Profesor:</label>
              <select
                id="profesor_id"
                name="profesor_id"
                value={clase.profesor_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                required
              >
                <option value={0}>Seleccione un profesor</option>
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
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
