import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { listarProfesores, eliminarProfesor } from '../../data/profesores.conexion';
import { Profesor } from '../../interfaces/interfaces';
import { useEffect, useState } from 'react';
import { host, hostImg } from '../../data/server';
import axios from 'axios';

interface Materia {
  id: number;
  nombre: string;
  experiencia: string;
  calificacion_alumno: number;
}

const obtenerNombreMateria = async (materiaId: number) => {
  try {
    const response = await axios.get(`${host}/materias/${materiaId}`);
    return response.data.nombre;
  } catch (error) {
    console.error('Error al obtener el nombre de la materia:', error);
    return 'Desconocido';
  }
};

export default function Profesores() {
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [materiasPorProfesor, setMateriasPorProfesor] = useState<Record<number, Materia[]>>({});
  const [materiasVisibles, setMateriasVisibles] = useState<Record<number, boolean>>({}); // Estado para manejar la visibilidad

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lista: Profesor[] = await listarProfesores();
        setProfesores(lista);

        // Llamar a obtenerMaterias para cada profesor
        lista.forEach(profe => obtenerMaterias(profe.id));
      } catch (error) {
        console.error('Error al obtener la lista de profesores:', error);
      }
    };

    fetchData();
  }, []);

  const obtenerMaterias = async (id: number) => {
    try {
      const response = await axios.get(`${host}/profesor_materia?profesor_id=${id}`);
      const materiasConNombre = await Promise.all(
        response.data.map(async (materia) => {
          const nombreMateria = await obtenerNombreMateria(materia.materia_id);
          return { ...materia, nombre: nombreMateria };
        })
      );

      setMateriasPorProfesor((prev) => ({
        ...prev,
        [id]: materiasConNombre,
      }));
      setMateriasVisibles((prev) => ({
        ...prev,
        [id]: false, // Inicialmente las materias están ocultas
      }));
    } catch (error) {
      console.error('Error al obtener materias:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de que deseas eliminar este profesor?')) {
      try {
        await eliminarProfesor(id);
        setProfesores(prevState => prevState.filter(profe => profe.id !== id));
      } catch (error) {
        console.error('Error al eliminar el profesor:', error);
      }
    }
  };

  const filteredProfesores = profesores
    .filter(profe =>
      profe.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  const toggleMaterias = (id: number) => {
    setMateriasVisibles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-cyan-700 min-h-screen flex flex-col items-center pt-24 bg-cover bg-center bg-no-repeat pl-4 md:pl-16 lg:pl-52 pr-6">
        <div className="w-full max-w-screen-xl bg-gray-800 mb-5 flex flex-col lg:flex-row justify-between items-center backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-white mb-4 lg:mb-0">Gestión de Profesores</h2>
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            />
            <Link to="/profesor/crear" className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300">
              Crear Nuevo Profesor
            </Link>
          </div>
        </div>

        <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-2 px-0">
          {filteredProfesores.map((profe) => (
            <div className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6" key={profe.cedula}>
              <div className="flex flex-col items-center">
                {profe.image_path ? (
                  <img
                    src={hostImg + profe.image_path}
                    alt="Perfil"
                    className="h-28 w-28 rounded-full border-4 border-green-600 mb-4"
                  />
                ) : (
                  <img
                    src="/perfil.png"
                    alt="Perfil"
                    className="h-28 w-28 rounded-full border-4 border-green-600 mb-4"
                  />
                )}
                <h3 className="text-2xl font-semibold text-green-300 mb-2">{profe.nombre}</h3>
                <p className="text-gray-400 mb-2">Cédula: {profe.cedula}</p>
                <p className="text-gray-400 mb-4">Tipo de Contrato: {profe.tipo_contrato}</p>
                
                {/* Botón para ocultar/mostrar materias */}
                <button
                  onClick={() => toggleMaterias(profe.id)}
                  className="bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                >
                  {materiasVisibles[profe.id] ? 'Ocultar Materias' : 'Mostrar Materias'}
                </button>
                
                {/* Materias del profesor */}
                {materiasVisibles[profe.id] && (
                  <div className="text-left w-full mt-4">
                    <h4 className="text-green-400 font-semibold mb-2">Materias:</h4>
                    {materiasPorProfesor[profe.id]?.map((materia) => (
                      <div key={materia.id} className="text-gray-300 mb-2">
                        <p>Nombre: {materia.nombre}</p>
                        <p>Experiencia: {materia.experiencia}</p>
                        <p>Calificación: {materia.calificacion_alumno}</p>
                      </div>
                    )) || <p className="text-gray-300">No tiene materias asignadas.</p>}
                  </div>
                )}

                <div className="flex gap-4 w-full mt-4">
                  <Link
                    to={`/profesor/perfil/${profe.id}`}
                    className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 w-full text-center"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(profe.id)}
                    className="bg-red-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 w-full text-center"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
