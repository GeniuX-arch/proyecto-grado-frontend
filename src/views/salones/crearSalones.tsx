import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { motion } from 'framer-motion';

interface SalonForm {
  codigo: string;
  capacidad_alumnos: string;
  tipo: string;
}

export default function CrearSalon() {
  const { id } = useParams<{ id: string }>(); 
  const [salonForm, setSalonForm] = useState<SalonForm>({
    codigo: '',
    capacidad_alumnos: '',
    tipo: '',
  });

  const [mensaje, setMensaje] = useState<string>('');

  useEffect(() => {
    const fetchSalonData = async () => {
      if (id) {
        try {
          const response = await axios.get(`${host}/salones/${id}`);
          const salonData = response.data;
          setSalonForm({
            codigo: salonData.codigo,
            capacidad_alumnos: salonData.capacidad_alumnos.toString(),
            tipo: salonData.tipo,
          });
        } catch (error) {
          console.error('Error fetching salon data:', error);
          setMensaje('Error al cargar los datos del salón');
        }
      }
    };

    fetchSalonData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalonForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const salon = {
        codigo: salonForm.codigo,
        capacidad_alumnos: parseInt(salonForm.capacidad_alumnos) || 0,
        tipo: salonForm.tipo,
      };

      if (id) {
        await axios.put(`${host}/salones/${id}`, salon);
        setMensaje('Salón actualizado exitosamente');
      } else {
        await axios.post(`${host}/salones`, salon);
        setMensaje('Salón creado exitosamente');
      }

      setSalonForm({
        codigo: '',
        capacidad_alumnos: '',
        tipo: '',
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
        className="w-full max-w-md p-6 bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          {id ? 'Editar Salón' : 'Crear Salón'}
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
          {/* Campo Código */}
          <div className="mb-4 relative">
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={salonForm.codigo}
              onChange={handleChange}
              className="peer h-full w-full border-b border-cyan-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border-cyan-300 focus:border-cyan-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="codigo"
              className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-cyan-300 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-cyan-300 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-300 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-500"
            >
              Código:
            </label>
          </div>

          {/* Campo Capacidad de Alumnos */}
          <div className="mb-4 relative">
            <input
              type="number"
              id="capacidad_alumnos"
              name="capacidad_alumnos"
              value={salonForm.capacidad_alumnos}
              onChange={handleChange}
              className="peer h-full w-full border-b border-cyan-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border-cyan-300 focus:border-cyan-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="capacidad_alumnos"
              className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-cyan-300 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-cyan-300 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-300 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-500"
            >
              Capacidad de Alumnos:
            </label>
          </div>

          {/* Campo Tipo */}
          <div className="mb-4 relative">
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={salonForm.tipo}
              onChange={handleChange}
              className="peer h-full w-full border-b border-cyan-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border-cyan-300 focus:border-cyan-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="tipo"
              className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-cyan-300 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-cyan-300 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-300 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-500"
            >
              Tipo:
            </label>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              {id ? 'Actualizar Salón' : 'Guardar Salón'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
