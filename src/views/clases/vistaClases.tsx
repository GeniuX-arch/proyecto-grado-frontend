import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { listarClases, eliminarClase } from '../../data/clases.conexion'; 
import { Clase } from '../../interfaces/interfaces'; 
import { useEffect, useState } from 'react';
import Horario from '../../components/Horario'; // Asegúrate de que el componente Horario esté bien implementado

export default function Clases() {
  const [clases, setClases] = useState<Clase[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [horario, setHorario] = useState<Horario[]>([]); // Estado para el horario

interface Horario {
  id: number;
  titulo: string;
  descripcion:string;
  dia: string;
  horaInicio: string;
  horaFin: string;
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lista  = await listarClases();
        
        console.log(lista)
        const horarios = await lista.map((item) => ({
          id: item.id,
          descripcion:"descripcion",
          titulo: item.grupo,
          dia: item.dia_semana, // Asumiendo que el campo original es 'dia_semana'
          horaInicio: item.hora_inicio, // Cambiar nombre de 'hora_inicio' a 'horaInicio'
          horaFin: item.hora_fin,
        }));

        setHorario(horarios)
        setClases(lista);
        console.log(horario)

      } catch (error) {
        console.error('Error al obtener la lista de clases:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta clase?')) {
      try {
        await eliminarClase(id);
        setClases(prevState => prevState.filter(clase => clase.id !== id));
      } catch (error) {
        console.error('Error al eliminar la clase:', error);
      }
    }
  };

  const filteredClases = clases.filter(clase =>
    clase.grupo.toLowerCase().includes(searchTerm.toLowerCase())
  );


    // Limpiar el timeout en caso de que el componente se desmonte antes de que se ejecute el timeout

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center pt-24 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url('https://c.wallhere.com/photos/64/fc/3840x2160_px_animals_artwork_Clear_Sky_Deer_digital_art_drawing_Firewatch-516653.jpg!d')`,
      }}>
        <div className="w-full max-w-screen-xl mb-8 flex flex-col lg:flex-row justify-between items-center bg-opacity-80 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-white mb-4 lg:mb-0">Gestión de Clases</h2>
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Buscar por grupo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            />
            <Link to="/clases" className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300">
              Crear Nueva Clase
            </Link>
          </div>
        </div>

        <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {filteredClases.map((clase) => (
            <div className="bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6" key={clase.id}>
              <div className="flex flex-col items-center">

                <div className="flex flex-col gap-2 w-full">
                  <div className="flex gap-4 w-full">
                    <Link
                      to={`/clase/editar/${clase.id}`}
                      className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 w-full text-center"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(clase.id)}
                      className="bg-red-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 w-full text-center"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Horario listadoClases={horario} />
    </>
  );

}
