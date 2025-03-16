import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { actualizarProfesor, crearProfesor } from '../../data/profesores.conexion';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

interface Profesor {
  id?: number;
  tipo_cedula: string;
  cedula: string;
  nombre: string;
  tipo_contrato: string;
  estado: string;
  image_path?: string;
}

export default function CrearProfesor() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [profesor, setProfesor] = useState<Profesor>({
    tipo_cedula: '',
    cedula: '',
    nombre: '',
    tipo_contrato: '',
    estado: '',
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    const fetchProfesorData = async () => {
      if (id) {
        try {
          const response = await axios.get(`${host}/profesores/${id}`);
          const profesorData = response.data;
          setProfesor({
            tipo_cedula: profesorData.tipo_cedula,
            cedula: profesorData.cedula,
            nombre: profesorData.nombre,
            tipo_contrato: profesorData.tipo_contrato,
            estado: profesorData.estado,
          });
          setImagePreview(profesorData.image_path);
        } catch (error) {
          console.error('Error fetching profesor data:', error);
          setMensaje('Error al cargar los datos del profesor');
        }
      }
    };

    fetchProfesorData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'cedula' && isNaN(Number(value))) {
      return;
    }

    setProfesor(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRemoveImages = () => {
    setImage(null);
    setImagePreview(null);
    setFileName("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append('tipo_cedula', profesor.tipo_cedula);
    data.append('cedula', profesor.cedula);
    data.append('nombre', profesor.nombre);
    data.append('tipo_contrato', profesor.tipo_contrato);
    data.append('estado', profesor.estado);
    if (image) {
      data.append('image', image);
    }

    try {
      if (id) {
        await actualizarProfesor(Number(id), data);
        setMensaje('Profesor actualizado exitosamente');
      } else {
        await crearProfesor(data); //argument of type FormData error is not assignable to parameter of type 'Profesor'
        setMensaje('Profesor creado exitosamente');
      }

      setProfesor({
        tipo_cedula: '',
        cedula: '',
        nombre: '',
        tipo_contrato: '',
        estado: '',
      });
      setImage(null);
      setImagePreview(null);
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
          {id ? 'Editar Profesor' : 'Crear Profesor'}
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
          {/* Tipo de Cédula */}
          <div className="mb-4 relative">
  <select
    id="tipo_cedula"
    name="tipo_cedula"
    value={profesor.tipo_cedula}
    onChange={handleChange}
    className="peer h-full w-full border-b border-cyan-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border-cyan-300 focus:border-cyan-500"
    required
  >
    <option
      value=""
      disabled
      className="bg-gray-800 text-white"
    >
      Seleccione un tipo de cédula
    </option>
    <option
      value="cc"
      className="bg-gray-800 text-white"
    >
      Cédula de Ciudadanía
    </option>
    <option
      value="ce"
      className="bg-gray-800 text-white"
    >
      Cédula de Extranjería
    </option>
    <option
      value="ti"
      className="bg-gray-800 text-white"
    >
      Tarjeta de Identidad
    </option>
    <option
      value="rc"
      className="bg-gray-800 text-white"
    >
      Registro Civil
    </option>
    <option
      value="pasaporte"
      className="bg-gray-800 text-white"
    >
      Pasaporte
    </option>
  </select>
  <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-cyan-300 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-cyan-300 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-300 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-500">
    Tipo de Cédula:
  </label>
</div>

          {/* Cédula */}
          <div className="mb-4 relative">
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={profesor.cedula}
              onChange={handleChange}
              className="peer h-full w-full border-b border-cyan-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border-cyan-300 focus:border-cyan-500"
              placeholder=" "
              required
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-cyan-300 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-cyan-300 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-300 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-500">
              Cédula:
            </label>
          </div>

          {/* Nombre */}
          <div className="mb-4 relative">
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={profesor.nombre}
              onChange={handleChange}
              className="peer h-full w-full border-b border-cyan-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border-cyan-300 focus:border-cyan-500"
              placeholder=" "
              required
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-cyan-300 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-cyan-300 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-300 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-500">
              Nombre:
            </label>
          </div>

          {/* Tipo de Contrato */}
          <div className="mb-4 relative">
  <select
    id="tipo_contrato"
    name="tipo_contrato"
    value={profesor.tipo_contrato}
    onChange={handleChange}
    className="peer h-full w-full border-b border-cyan-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border-cyan-300 focus:border-cyan-500"
    required
  >
    <option
      value=""
      disabled
      className="bg-gray-800 text-white"
    >
      Seleccione un tipo de contrato
    </option>
    <option
      value="catedra"
      className="bg-gray-800 text-white"
    >
      Cátedra
    </option>
    <option
      value="planta"
      className="bg-gray-800 text-white"
    >
      Planta
    </option>
    <option
      value="tiempo_completo"
      className="bg-gray-800 text-white"
    >
      Tiempo Completo
    </option>
  </select>
  <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-cyan-300 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-cyan-300 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-300 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-500">
    Tipo de Contrato:
  </label>
</div>


          {/* Estado */}
         <div className="mb-4 relative">
  <select
    id="estado"
    name="estado"
    value={profesor.estado}
    onChange={handleChange}
    className="peer h-full w-full border-b border-cyan-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border-cyan-300 focus:border-cyan-500"
    required
  >
    <option
      value=""
      disabled
      className="bg-gray-800 text-white"
    >
      Seleccione un estado
    </option>
    <option
      value="inactivo"
      className="bg-gray-800 text-white"
    >
      Inactivo
    </option>
    <option
      value="en_proceso"
      className="bg-gray-800 text-white"
    >
      En Proceso
    </option>
    <option
      value="activo"
      className="bg-gray-800 text-white"
    >
      Activo
    </option>
  </select>
  <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-cyan-300 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-cyan-300 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-300 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-500">
    Estado:
  </label>
</div>


          {/* Imagen */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-cyan-300 mb-2">
              Foto de Perfil:
            </label>
            <div className="relative w-full h-44 flex items-center justify-center border-2 border-dashed border-cyan-300 rounded-lg bg-transparent hover:bg-gray-700/50 transition-all duration-300">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                required={!id}
              />
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-cyan-400 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 16l5.5-5.5a2.5 2.5 0 013.5 0l4 4 6-6"
                  />
                </svg>
                <span className="block text-sm font-medium text-cyan-300">
                  Arrastra una imagen aquí o haz clic para seleccionar
                </span>
                <span className="block text-xs text-cyan-400/70 mt-1">
                  (Formatos: JPG, PNG, GIF)
                </span>
              </div>
            </div>
          </div>
          {imagePreview && (
            <div className="flex flex-col items-center p-4 mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-full mb-4 border-4 border-cyan-500"
              />
              <span className="block text-sm font-medium text-cyan-300 mb-2">
                {fileName}
              </span>
              <button
                type="button"
                onClick={handleRemoveImages}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Quitar Imagen
              </button>
            </div>
          )}

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              {id ? 'Actualizar Profesor' : 'Guardar Profesor'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}