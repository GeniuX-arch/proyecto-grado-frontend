import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Profesor, ProfesorMateria } from '../../interfaces/interfaces';

export default function CrearProfesorMateria() {
  const [profesorMateria, setProfesorMateria] = useState<ProfesorMateria>({
    id: 0, // Cambia esto a un número, ya que id suele ser un número en las bases de datos
    profesor_id: 0, // Cambiar a número
    materia_id: 0, // Cambiar a número
    calificacion_alumno: 0, // Cambiar a número
    experiencia: '', // Inicialmente vacío
  });

  const [mensaje, setMensaje] = useState<string>('');
  const [materias, setMaterias] = useState<{ id: number; nombre: string }[]>([]); // Tipar el estado de materias
  const [profesores, setProfesores] = useState<Profesor[]>([]); // Tipar el estado de profesores

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [materiasResponse, profesoresResponse] = await Promise.all([
          axios.get(`${host}/materias`),
          axios.get(`${host}/profesores`),
        ]);

        setMaterias(materiasResponse.data);
        setProfesores(profesoresResponse.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfesorMateria((prevState) => ({
      ...prevState,
      [name]: name === 'calificacion_alumno' ? Number(value) : value, // Convierte la calificación a número
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${host}/profesor_materia`, profesorMateria);
      console.log('Respuesta del servidor:', response.data);
      
      // Restablecer el formulario
      setProfesorMateria({
        id: 0, // Restablecer a un valor inicial
        profesor_id: 0,
        materia_id: 0,
        calificacion_alumno: 0,
        experiencia: '',
      });
      setMensaje('Profesor y materia asociados exitosamente');
    } catch (error: any) {
      console.error('Error al enviar los datos:', error);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
        setMensaje(`Error: ${error.response.data.message || 'Error al enviar los datos'}`);
      } else {
        setMensaje('Error al enviar los datos');
      }
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
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Crear Profesor-Materia</h2>

          {mensaje && (
            <div className={`mb-4 p-4 text-center text-white rounded ${mensaje.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Profesor */}
            <div className="mb-4">
              <label htmlFor="profesor_id" className="block text-green-700 font-medium mb-2">Profesor:</label>
              <select
                id="profesor_id"
                name="profesor_id"
                value={profesorMateria.profesor_id}
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

            {/* Materia */}
            <div className="mb-4">
              <label htmlFor="materia_id" className="block text-green-700 font-medium mb-2">Materia:</label>
              <select
                id="materia_id"
                name="materia_id"
                value={profesorMateria.materia_id}
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

            {/* Calificación del alumno */}
            <div className="mb-4">
              <label htmlFor="calificacion_alumno" className="block text-green-700 font-medium mb-2">Calificación Alumno:</label>
              <input
                type="number"
                id="calificacion_alumno"
                name="calificacion_alumno"
                value={profesorMateria.calificacion_alumno}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                required
              />
            </div>

            {/* Experiencia */}
            <div className="mb-4">
              <label htmlFor="experiencia" className="block text-green-700 font-medium mb-2">Experiencia:</label>
              <input
                type="text"
                id="experiencia"
                name="experiencia"
                value={profesorMateria.experiencia}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
