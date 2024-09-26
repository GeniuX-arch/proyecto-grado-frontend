import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { host } from '../data/server';
import { Clases } from '../interfaces/interfaces';

export default function CrearClase() {
  const [clase, setClase] = useState<Clases>({
    grupo: '',
    dia_semana: '',
    hora_inicio: '',
    hora_fin: '',
    alumnos: '',
    materia_id: '',
    salon_id: '',
  });

  const [mensaje, setMensaje] = useState<string>('');
  const [materias, setMaterias] = useState([]);
  const [salones, setSalones] = useState([]);

  useEffect(() => {
    axios.get(`${host}/materias`).then((response) => {
      setMaterias(response.data);
    });

    axios.get(`${host}/salones`).then((response) => {
      setSalones(response.data);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setClase((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`${host}/clases`, clase);
      setClase({
        grupo: '',
        dia_semana: '',
        hora_inicio: '',
        hora_fin: '',
        alumnos: '',
        materia_id: '',
        salon_id: '',
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
              <input
                type="text"
                id="dia_semana"
                name="dia_semana"
                value={clase.dia_semana}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese el día de la semana"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="hora_inicio" className="block text-green-700 font-medium mb-2">Hora de Inicio:</label>
              <input
                type="time"
                id="hora_inicio"
                name="hora_inicio"
                value={clase.hora_inicio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="hora_fin" className="block text-green-700 font-medium mb-2">Hora de Fin:</label>
              <input
                type="time"
                id="hora_fin"
                name="hora_fin"
                value={clase.hora_fin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                required
              />
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
                <option value="">Seleccione una materia</option>
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
                <option value="">Seleccione un salón</option>
                {salones.map((salon) => (
                  <option key={salon.id} value={salon.id}>
                    {salon.tipo} (Capacidad: {salon.capacidad_alumnos})
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
