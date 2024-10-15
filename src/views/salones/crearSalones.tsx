import axios from 'axios';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';

interface SalonForm {
  codigo: string;
  capacidad_alumnos: string;
  tipo: string;
}

export default function CrearSalon() {
  const [salonForm, setSalonForm] = useState<SalonForm>({
    codigo: '',
    capacidad_alumnos: '',
    tipo: '',
  });

  const [mensaje, setMensaje] = useState<string>('');

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

      await axios.post(`${host}/salones`, salon);

      setSalonForm({
        codigo: '',
        capacidad_alumnos: '',
        tipo: '',
      });
      setMensaje('Salón creado exitosamente');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setMensaje('Error al enviar los datos');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ /* Estilo de fondo personalizado si es necesario */ }}
    >
      <Navbar />
      <div className="relative min-h-screen flex flex-col items-center pt-32">
        <div className="w-full max-w-md p-6 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Crear Salón</h2>

          {mensaje && (
            <div className={`mb-4 p-4 text-center text-white rounded ${mensaje.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Campo ID */}
            
            <div className="mb-4 relative">
              <input
                type="text"
                id="codigo"
                name="codigo"
                value={salonForm.codigo}
                onChange={handleChange}
                className="peer h-full w-full border-b border-green-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-black outline-none transition-all placeholder-shown:border-green-300 focus:border-green-500 disabled:border-0 disabled:bg-green-50"
                placeholder=" " // Mantener el placeholder vacío para el efecto
                required
              />
              <label
                htmlFor="codigo"
                className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-green-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:after:scale-x-100 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-green-500"
              >
                Cédula
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
                className="peer h-full w-full border-b border-green-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-black outline-none transition-all placeholder-shown:border-green-300 focus:border-green-500 disabled:border-0 disabled:bg-green-50"
                placeholder=" " // Mantener el placeholder vacío para el efecto
                required
              />
              <label
                htmlFor="capacidad_alumnos"
                className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-green-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:after:scale-x-100 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-green-500"
              >
                Capacidad de alumnos:
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
                  className="peer h-full w-full border-b border-green-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-black outline-none transition-all placeholder-shown:border-green-300 focus:border-green-500 disabled:border-0 disabled:bg-green-50"
                  placeholder=" " // Mantener el placeholder vacío para el efecto
                  required
                />
                <label
                  htmlFor="tipo"
                  className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-green-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:after:scale-x-100 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-green-500"
                >
                  tipo:
                </label>
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
