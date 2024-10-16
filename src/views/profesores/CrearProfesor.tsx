import axios from 'axios';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';

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
  const [profesor, setProfesor] = useState<Profesor>({
    tipo_cedula: '',
    cedula: '',
    nombre: '',
    tipo_contrato: '',
    estado: '',
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Estado para la vista previa de la imagen
  const [mensaje, setMensaje] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Ensure 'cedula' only accepts numbers
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
  setFileName(""); // Si 'setFileName' es necesario, asegúrate de tenerlo definido en el state.
};
   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (file) {
    setImage(file);
    setFileName(file.name);

    // Crear vista previa de la imagen
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};





  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(); // Create a FormData object
    data.append('tipo_cedula', profesor.tipo_cedula);
    data.append('cedula', profesor.cedula);
    data.append('nombre', profesor.nombre);
    data.append('tipo_contrato', profesor.tipo_contrato);
    data.append('estado', profesor.estado);
    if (image) {
      data.append('image', image); // Append the image file if it exists
    }

    try {
      await axios.post(`${host}/profesores`, data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });
      setProfesor({
        tipo_cedula: '',
        cedula: '',
        nombre: '',
        tipo_contrato: '',
        estado: '',
      });
      setImage(null); // Reset image state
      setImagePreview(null); // Reset image preview
      setMensaje('Profesor creado exitosamente');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setMensaje('Error al enviar los datos');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
      }}
    >
      <Navbar />
      <div className="relative min-h-screen flex flex-col items-center pt-32">
        <div className="w-full max-w-md p-6 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg  rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Crear Profesor</h2>

          {mensaje && (
            <div className={`mb-4 p-4 text-center text-white rounded ${mensaje.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
              {mensaje}
            </div>
          )}

          {/* cambiar */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
    <label htmlFor="tipo_cedula" className="block mb-1 text-sm text-green-700">
        Tipo de Cédula:
    </label>

    <div className="relative">
        <select
            id="tipo_cedula"
            name="tipo_cedula"
            value={profesor.tipo_cedula}
            onChange={handleChange}
            className="w-full h-10 bg-transparent placeholder:text-slate-400 text-black text-sm border border-green-300 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-green-500 shadow-sm focus:shadow-md appearance-none cursor-pointer"
            required
        >
            <option value="" disabled>Seleccione un tipo de cédula</option>
            <option value="cc">Cédula de Ciudadanía</option>
            <option value="ce">Cédula de Extranjería</option>
            <option value="ti">Tarjeta de Identidad</option>
            <option value="rc">Registro Civil</option>
            <option value="pasaporte">Pasaporte</option>
        </select>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.2" 
            stroke="currentColor" 
            className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-green-700"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" 
            />
        </svg>
    </div>
</div>

          {/* correcto */}
            <div className="mb-4 relative">
              <input
                type="number"
                id="cedula"
                name="cedula"
                value={profesor.cedula}
                onChange={handleChange}
                className="peer h-full w-full border-b border-green-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-black outline-none transition-all placeholder-shown:border-green-300 focus:border-green-500 disabled:border-0 disabled:bg-green-50"
                placeholder=" " // Mantener el placeholder vacío para el efecto
                required
              />
              <label
                htmlFor="cedula"
                className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-green-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:after:scale-x-100 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-green-500"
              >
                Cédula
              </label>
            </div>





          {/* cambiar */}
            
            <div className="mb-4 relative">
  <input
    type="text"
    id="nombre"
    name="nombre"
    value={profesor.nombre}
    onChange={handleChange}
    className="peer h-full w-full border-b border-green-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-black outline-none transition-all placeholder-shown:border-green-300 focus:border-green-500 disabled:border-0 disabled:bg-green-50"
    placeholder=" " // Mantener el placeholder vacío para el efecto
    required
  />
  <label
    htmlFor="nombre"
    className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-green-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:after:scale-x-100 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-green-500"
  >
    Nombre
  </label>
</div>


          {/* cambiar */}
            <div className="mb-4">
    <label htmlFor="tipo_contrato" className="block mb-1 text-sm text-green-700">
        Tipo de Contrato:
    </label>

    <div className="relative">
        <select
            id="tipo_contrato"
            name="tipo_contrato"
            value={profesor.tipo_contrato}
            onChange={handleChange}
            className="w-full h-10 bg-transparent placeholder:text-slate-400 text-black text-sm border border-green-300 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-green-500 shadow-sm focus:shadow-md appearance-none cursor-pointer"
            required
        >
            <option value="" disabled>Seleccione un tipo de contrato</option>
            <option value="catedra">Cátedra</option>
            <option value="planta">Planta</option>
            <option value="tiempo_completo">Tiempo Completo</option>
        </select>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.2" 
            stroke="currentColor" 
            className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-green-700"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" 
            />
        </svg>
    </div>
</div>


          {/* correcto */}
   <div className="mb-4">
    <label htmlFor="estado" className="block mb-1 text-sm text-green-700">
        Estado:
    </label>

    <div className="relative">
        <select
            id="estado"
            name="estado"
            value={profesor.estado}
            onChange={handleChange}
            className="w-full h-10 bg-transparent placeholder:text-slate-400 text-black text-sm border border-green-300 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-green-500 shadow-sm focus:shadow-md appearance-none cursor-pointer"
            required
        >
            <option value="" disabled>Seleccione un estado</option>
            <option value="inactivo">Inactivo</option>
            <option value="en_proceso">En Proceso</option>
            <option value="activo">Activo</option>
        </select>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.2" 
            stroke="currentColor" 
            className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-green-700"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" 
            />
        </svg>
    </div>
</div>

            <div className="mb-6">
              <label htmlFor="image" className="block text-lg font-semibold text-green-600 mb-3">
                Subir Foto de Perfil:
              </label>
              <div className="relative w-full h-44 flex items-center justify-center border-2 border-dashed border-green-400 rounded-lg bg-gray-100 hover:bg-gray-50 focus-within:border-green-500 transition-all duration-300">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  required
                />
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-green-400 mx-auto mb-2"
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
                  <span className="block text-sm font-medium text-gray-500">
                    Arrastra una imagen aquí o haz clic para seleccionar
                  </span>
                  <span className="block text-xs text-gray-400 mt-1">
                    (Formatos: JPG, PNG, GIF)
                  </span>
                </div>
              </div>
            </div>
            {/* Vista previa de la imagen */}
             {imagePreview && (
          <div className="flex flex-col items-center p-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-32 w-32 object-cover rounded-full mb-4 border-4 border-green-500"
            />
            <span className="block text-sm font-medium text-gray-500">
              {fileName}
            </span>
            <button
              onClick={handleRemoveImages}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              Quitar Imagen
            </button>
          </div>
        )}

        
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
