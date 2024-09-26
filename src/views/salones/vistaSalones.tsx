import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Salones } from '../../interfaces/interfaces';
import { Link } from 'react-router-dom';

export default function VerSalones() {
  const [salones, setSalones] = useState<Salones[]>([]);
  const [mensaje, setMensaje] = useState<string>('');
  const [salonAEditar, setSalonAEditar] = useState<Salones | null>(null);

  // Función para obtener la lista de salones
  const fetchSalones = async () => {
    try {
      const response = await axios.get(`${host}/salones`);
      setSalones(response.data);
    } catch (error) {
      console.error('Error al cargar los salones:', error);
      setMensaje('Error al cargar los salones.');
    }
  };

  // Uso de useEffect para cargar los salones al montar el componente
  useEffect(() => {
    fetchSalones();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este salón?')) {
      try {
        await axios.delete(`${host}/salones/${id}`);
        setSalones(prevState => prevState.filter(salon => salon.id !== id));
        setMensaje('Salón eliminado exitosamente.');
      } catch (error) {
        console.error('Error al eliminar el salón:', error);
        setMensaje('Error al eliminar el salón.');
      }
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (salonAEditar) {
      try {
        await axios.put(`${host}/salones/${salonAEditar.id}`, salonAEditar);
        setSalonAEditar(null);
        fetchSalones(); // Recargar la lista de salones
        setMensaje('Salón editado exitosamente.');
      } catch (error) {
        console.error('Error al editar el salón:', error);
        setMensaje('Error al editar el salón.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalonAEditar(prevState => ({
      ...prevState,
      [name]: value,
    }));
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
        <div className="w-full max-w-4xl p-6 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-md">
          <div>
            <Link to="/salones/crear" className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300">
              Crear Salón
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Lista de Salones</h2>

          {mensaje && (
            <div className={`mb-4 p-4 text-center text-white rounded ${mensaje.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
              {mensaje}
            </div>
          )}

          <table className="min-w-full bg-white border border-green-300">
            <thead>
              <tr>
                <th className="py-2 border-b text-left text-green-700">Capacidad de Alumnos</th>
                <th className="py-2 border-b text-left text-green-700">Tipo</th>
                <th className="py-2 border-b text-left text-green-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {salones.map((salon) => (
                <tr key={salon.id}>
                  <td className="py-2 border-b text-center">{salon.capacidad_alumnos}</td>
                  <td className="py-2 border-b text-center">{salon.tipo}</td>
                  <td className="py-2 border-b text-center">
                    <button onClick={() => setSalonAEditar(salon)} className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition duration-300">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(salon.id)} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-300 ml-2">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {salonAEditar && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Editar Salón</h2>
              <form onSubmit={handleEdit}>
                <div className="mb-4">
                  <label htmlFor="capacidad_alumnos" className="block text-green-700 font-medium mb-2">Capacidad de Alumnos:</label>
                  <input
                    type="number"
                    id="capacidad_alumnos"
                    name="capacidad_alumnos"
                    value={salonAEditar.capacidad_alumnos}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    placeholder="Ingrese la capacidad de alumnos"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="tipo" className="block text-green-700 font-medium mb-2">Tipo:</label>
                  <input
                    type="text"
                    id="tipo"
                    name="tipo"
                    value={salonAEditar.tipo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    placeholder="Ingrese el tipo"
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Actualizar
                  </button>
                  <button
                    type="button"
                    onClick={() => setSalonAEditar(null)}
                    className="mt-2 w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
