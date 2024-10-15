import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Salon } from '../../interfaces/interfaces';
import { Link } from 'react-router-dom';

export default function VerSalones() {
  const [salones, setSalones] = useState<Salon[]>([]);
  const [mensaje, setMensaje] = useState<string>('');
  const [salonAEditar, setSalonAEditar] = useState<Salon | null>(null);

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

      setSalonAEditar((prevState) => {
        // Si prevState es null, se asigna un objeto vacío
        const currentState = prevState ?? {} as Salon;
        
        return {
          ...currentState,
          [name]: value,
        };
      });
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

          <table className="min-w-full bg-slate-50 rounded-lg ">
            <thead>
              <tr>
                <th className="py-2 text-center text-green-700">Código</th> {/* Nueva columna */}
                <th className="py-2 text-center text-green-700">Capacidad de Alumnos</th>
                <th className="py-2 text-center text-green-700">Tipo</th>
                <th className="py-2 text-center text-green-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {salones.map((salon) => (
                <tr key={salon.id}>
                  <td className="py-4 text-center">{salon.codigo}</td> {/* Mostrar código */}
                  <td className="py-4 text-center">{salon.capacidad_alumnos}</td>
                  <td className="py-4 text-center">{salon.tipo}</td>
                  <td className="py-4 flex flex-row gap-2 items-center justify-center">
                    <button onClick={() => setSalonAEditar(salon)} className="bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition duration-300">

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                    </svg>
                    </button>
                    <button onClick={() => handleDelete(salon.id)} className="bg-red-600  text-white px-4 py-1.5 rounded hover:bg-red-700 transition duration-300 ml-2">

                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                      </svg>
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
                  <label htmlFor="codigo" className="block text-green-700 font-medium mb-2">Código:</label> {/* Nuevo campo para editar código */}
                  <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    value={salonAEditar.codigo} // Aquí se agrega el valor de código
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    placeholder="Ingrese el código"
                    required
                  />
                </div>

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
