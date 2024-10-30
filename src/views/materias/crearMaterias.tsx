import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { motion } from 'framer-motion';

interface Materias {
  codigo: string;
  nombre: string;
  alumnos: number;
  bloques: number;
}

export default function CrearMateria() {
  const { id } = useParams<{ id: string }>();
  const [materia, setMateria] = useState<Materias>({
    codigo: '',
    nombre: '',
    alumnos: 0,
    bloques: 0,
  });

  const [mensaje, setMensaje] = useState<string>('');

  useEffect(() => {
    const fetchMateriaData = async () => {
      if (id) {
        try {
          const response = await axios.get(`${host}/materias/${id}`);
          const materiaData = response.data;
          setMateria({
            codigo: materiaData.codigo,
            nombre: materiaData.nombre,
            alumnos: materiaData.alumnos,
            bloques: materiaData.bloques,
          });
        } catch (error) {
          console.error('Error fetching materia data:', error);
          setMensaje('Error al cargar los datos de la materia');
        }
      }
    };

    fetchMateriaData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMateria(prevState => ({
      ...prevState,
      [name]: name === 'alumnos' || name === 'bloques' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      if (id) {
        await axios.put(`${host}/materias/${id}`, materia);
        setMensaje('Materia actualizada exitosamente');
      } else {
        await axios.post(`${host}/materias`, materia);
        setMensaje('Materia creada exitosamente');
      }

      setMateria({
        codigo: '',
        nombre: '',
        alumnos: 0,
        bloques: 0,
      });
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setMensaje('Error al enviar los datos');
    }
  };

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
          {id ? 'Editar Materia' : 'Crear Materia'}
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
          {/* Código */}
          <div className="mb-6">
            <label htmlFor="codigo" className="block text-cyan-300 font-medium mb-2">Código:</label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={materia.codigo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          {/* Nombre */}
          <div className="mb-6">
            <label htmlFor="nombre" className="block text-cyan-300 font-medium mb-2">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={materia.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          {/* Alumnos */}
          <div className="mb-6">
            <label htmlFor="alumnos" className="block text-cyan-300 font-medium mb-2">Número de Alumnos:</label>
            <input
              type="number"
              id="alumnos"
              name="alumnos"
              value={materia.alumnos}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          {/* Bloques */}
          <div className="mb-6">
            <label htmlFor="bloques" className="block text-cyan-300 font-medium mb-2">Número de Bloques:</label>
            <input
              type="number"
              id="bloques"
              name="bloques"
              value={materia.bloques}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              {id ? 'Actualizar Materia' : 'Crear Materia'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
