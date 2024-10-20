import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Materia } from '../../interfaces/interfaces';
import { Link } from 'react-router-dom';

export default function VerMaterias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [mensaje, setMensaje] = useState<string>('');
  const [busqueda, setBusqueda] = useState<string>(''); // Estado para el término de búsqueda

  const fetchMaterias = async () => {
    try {
      const response = await axios.get(`${host}/materias`);
      setMaterias(response.data);
    } catch (error) {
      console.error('Error al obtener las materias:', error);
      setMensaje('Error al cargar las materias');
    }
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta materia?')) {
      try {
        await axios.delete(`${host}/materias/${id}`);
        setMaterias((prevState) => prevState.filter((materia) => materia.id !== id));
        setMensaje('Materia eliminada con éxito.');
      } catch (error) {
        console.error('Error al eliminar la materia:', error);
        setMensaje('Error al eliminar la materia.');
      }
    }
  };

  // Filtrar las materias según el término de búsqueda
  const materiasFiltradas = materias.filter((materia) =>
    materia.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pl-4 md:pl-16 lg:pl-52 "
      style={{
        backgroundImage: `url('https://c.wallhere.com/photos/64/fc/3840x2160_px_animals_artwork_Clear_Sky_Deer_digital_art_drawing_Firewatch-516653.jpg!d')`,
      }}
    >
      <Navbar />
      <div className="relative min-h-screen flex flex-col items-center pt-32">
        <div className="w-full max-w-4xl p-6 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-md">
          <div>
            <Link
              to="/materias/crear"
              className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
            >
              Crear nueva materia
            </Link>
            <p></p>
          </div>
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Materias</h2>

          {mensaje && (
            <div
              className={`mb-4 p-4 text-center text-white rounded ${
                mensaje.includes('Error') ? 'bg-red-500' : 'bg-green-500'
              }`}
            >
              {mensaje}
            </div>
          )}

          {/* Input para buscar materias */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {materiasFiltradas.length > 0 ? (
              materiasFiltradas.map((materia) => (
                <div key={materia.id} className="bg-white shadow-lg rounded-lg p-4">
                  <h3 className="text-lg font-bold text-green-700">{materia.nombre}</h3>
                  <p className="text-gray-600">Código: {materia.codigo}</p>
                  <p className="text-gray-600">Alumnos: {materia.alumnos}</p>
                  <p className="text-gray-600">Bloques: {materia.bloques}</p>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/materias/editar/${materia.id}`}
                      className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(materia.id)}
                      className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center">
                No hay materias disponibles
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
