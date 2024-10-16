import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the ID from the URL
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';

interface Materias {
  codigo: string; // Campo para el código
  nombre: string; // Campo para el nombre
  alumnos: number; // Campo para el número de alumnos
}

export default function CrearMateria() {
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL
  const [materia, setMateria] = useState<Materias>({
    codigo: '',
    nombre: '',
    alumnos: 0, // Cambiado a 0 para asegurar que sea un número
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
      [name]: name === 'alumnos' ? Number(value) : value, // Convertir a número si es necesario
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`${host}/materias/${id}`, materia); // Use PUT if ID is present
        setMensaje('Materia actualizada exitosamente');
      } else {
        await axios.post(`${host}/materias`, materia); // Use POST if no ID
        setMensaje('Materia creada exitosamente');
      }

      // Reset form after submission
      setMateria({
        codigo: '',
        nombre: '',
        alumnos: 0, // Reiniciar a 0 después de enviar
      });
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setMensaje('Error al enviar los datos');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        /* Estilo de fondo personalizado si es necesario */
      }}
    >
      <Navbar />
      <div className="relative min-h-screen flex flex-col items-center pt-32">
        <div className="w-full max-w-md p-6 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">{id ? 'Editar Materia' : 'Crear Materia'}</h2>

          {mensaje && (
            <div className={`mb-4 p-4 text-center text-white rounded ${mensaje.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <input
                type="text"
                id="codigo"
                name="codigo"
                value={materia.codigo}
                onChange={handleChange}
                className="peer h-full w-full border-b border-green-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-black outline-none transition-all placeholder-shown:border-green-300 focus:border-green-500 disabled:border-0 disabled:bg-green-50"
                placeholder=" " // Mantener el placeholder vacío para el efecto
                required
              />
              <label
                htmlFor="codigo"
                className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-green-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:after:scale-x-100 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-green-500"
              >
                Código
              </label>
            </div>
            <div className="mb-4 relative">
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={materia.nombre}
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

            <div className="mb-4 relative">
              <input
                type="number"
                id="alumnos"
                name="alumnos"
                value={materia.alumnos}
                onChange={handleChange}
                className="peer h-full w-full border-b border-green-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-black outline-none transition-all placeholder-shown:border-green-300 focus:border-green-500 disabled:border-0 disabled:bg-green-50"
                placeholder=" " // Mantener el placeholder vacío para el efecto
                required
              />
              <label
                htmlFor="alumnos"
                className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-green-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:after:scale-x-100 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-green-500"
              >
                Cantidad de alumnos
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                {id ? 'Actualizar' : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
