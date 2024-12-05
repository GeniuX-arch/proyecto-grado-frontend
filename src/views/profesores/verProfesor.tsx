import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import { host, hostImg } from '../../data/server';
import HorarioDisponible from '../../components/HorarioDisponible';
import Horario from '../../components/Horario';


interface Profesor {
  id?: number;
  tipo_cedula: string;
  cedula: string;
  nombre: string;
  tipo_contrato: string;
  estado: string;
  image_path?: string;
}

interface Materia {
  id: number;
  materia_nombre: string;
  experiencia: string;
  calificacion_alumno: number;
}

interface Horario {
  id: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
}

interface Clase {
  id: number;
  dia_semana: string;
  hora_inicio: string;
  hora_fin: string;
  grupo?: string;
  profesor_nombre?: string;
  materia_nombre?: string;
  salon_codigo?: string;
}

interface HorarioClase {
  id: number;
  titulo: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
  descripcion: string;
}

interface AuthUser {
  rol: string;
}

const VerProfesor: React.FC = () => {
  const { user } = useAuth() as { user: AuthUser };
  const { id } = useParams<{ id: string }>();
  const idNumber = Number(id);

  const [profesor, setProfesor] = useState<Profesor | null>(null);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [clases, setClases] = useState<Clase[]>([]);
  const [clasesHorario, setClasesHorario] = useState<HorarioClase[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string>('');
  const [mostrarHorarios, setMostrarHorarios] = useState<boolean>(false);
  const [mostrarClases, setMostrarClases] = useState<boolean>(false);

  const handleHorarios = (): void => {
    setMostrarHorarios(prev => !prev);
  };

  const handleClases = (): void => {
    setMostrarClases(prev => !prev);
  };

  const obtenerProfesor = async (): Promise<void> => {
    try {
      const response = await axios.get(`${host}/profesores/${id}`);
      setProfesor(response.data);
      setImagePreview(response.data.image_path ? `${hostImg}${response.data.image_path}` : null);
    } catch (error) {
      console.error('Error al obtener profesor:', error);
      setMensaje('Error al cargar los datos del profesor');
    }
  };

  const obtenerMaterias = async (): Promise<void> => {
    try {
      const response = await axios.get(`${host}/profesor_materia?profesor_id=${id}&name=true`);
      setMaterias(response.data);
    } catch (error) {
      console.error('Error al obtener materias:', error);
    }
  };

  const obtenerHorarios = async (): Promise<void> => {
    try {
      const response = await axios.get(`${host}/horarios_disponibles?profesor_id=${id}&name=true`);
      setHorarios(response.data);
    } catch (error) {
      console.error('Error al obtener horarios:', error);
    }
  };

  const obtenerClases = async (): Promise<void> => {
    try {
      const response = await axios.get(`${host}/clases?profesor_id=${id}&name=true`);
      const clasesData = response.data;
      setClases(clasesData);

      const horarios = clasesData.map((clase: Clase) => ({
        id: clase.id,
        titulo: clase.grupo || '',
        dia: clase.dia_semana,
        horaInicio: clase.hora_inicio,
        horaFin: clase.hora_fin,
        descripcion: `${clase.profesor_nombre}, ${clase.materia_nombre}, ${clase.salon_codigo}`.trim(),
      }));

      setClasesHorario(horarios);
    } catch (error) {
      console.error('Error al obtener clases:', error);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta materia?')) {
      try {
        await axios.delete(`${host}/materias/${id}`);
        setMaterias(prevState => prevState.filter(materia => materia.id !== id));
        setMensaje('Materia eliminada con éxito.');
      } catch (error) {
        console.error('Error al eliminar la materia:', error);
        setMensaje('Error al eliminar la materia.');
      }
    }
  };

  const handleImageClick = (): void => {
    document.getElementById('imageInput')?.click();
  };

  useEffect(() => {
    if (id) {
      obtenerProfesor();
      obtenerMaterias();
      obtenerHorarios();
      obtenerClases();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className={`pt-24 pl-4 ${user.rol === 'admin' ? "md:pl-16 lg:pl-52" : ""} pr-6 pb-5`}>
        <div className="flex flex-col lg:flex-row gap-5">
          <section className="lg:w-1/3 rounded-xl p-6 bg-gray-800 shadow-lg border border-gray-700">
            {mensaje && (
              <div className={`mb-4 p-4 text-center text-white rounded-lg w-full ${
                mensaje.includes('Error') ? 'bg-red-500/80' : 'bg-green-500/80'
              }`}>
                {mensaje}
              </div>
            )}
            
            <div className="flex flex-col justify-center items-center w-full">
              <div className="relative group cursor-pointer" onClick={handleImageClick}>
                <img
                  src={imagePreview || (profesor?.image_path ? `${hostImg}${profesor.image_path}` : "/perfil.jpg")}
                  alt="Perfil"
                  className="h-32 w-32 rounded-full border-4 border-green-500 mb-4 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="text-gray-300">
                <p className="font-bold">Cédula: <span className="font-normal">{profesor?.cedula}</span></p>
                <p className="font-bold">Nombre: <span className="font-normal">{profesor?.nombre}</span></p>
                <p className="font-bold">Tipo de Contrato: <span className="font-normal">{profesor?.tipo_contrato}</span></p>
                <p className="font-bold">Estado: <span className="font-normal">{profesor?.estado}</span></p>
                <Link
                  to={`/profesor/editar/${profesor?.id}`}
                  className="flex items-center justify-center mt-4 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          <section className="lg:w-2/3 rounded-xl p-6 bg-gray-800 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Materias Asignadas</h2>
            
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-3">
              {materias.map((materia) => (
                <li key={materia.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
                  <div>
                    <p className="text-lg text-white">{materia.materia_nombre}</p>
                    <p className="text-gray-400">Experiencia: {materia.experiencia} años</p>
                    <p className="text-gray-400">Calificación de alumno: {materia.calificacion_alumno}</p>
                  </div>
                  <div className='flex flex-row justify-center items-center'>
                    <Link
                      to={`/profesor-materia/editar/${materia.id}`}
                      className="flex items-center justify-center mt-4 p-2 rounded-lg text-blue-500 hover:bg-blue-900 transition-colors duration-300"
                    >
                      Editar
                    </Link>
                    <button 
                      onClick={() => handleDelete(materia.id)} 
                      className="text-red-500 flex items-center justify-center mt-4 p-2 rounded-lg hover:bg-red-900 transition-colors duration-300"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
              {materias.length === 0 && <li className="text-gray-300">No hay materias asignadas.</li>}
            </ul>
          </section>
        </div>

        <section className="mt-5 rounded-xl p-6 bg-gray-800 shadow-lg border border-gray-700">
          <h2 className='text-xl font-bold text-white mb-4'>Clases Asignadas</h2>
          <button onClick={handleClases} className="bg-blue-500 text-white p-2 rounded">
            {mostrarClases ? "Mostrar tabla" : "Mostrar horario"}
          </button> 
          {!mostrarClases && (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Clase</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hora Inicio</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hora Fin</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {clases.map((clase) => (
                    <tr key={clase.id} className="hover:bg-gray-700 transition-colors duration-200">
                      <td className="py-4 px-6 text-sm text-gray-300">{clase.dia_semana}</td>
                      <td className="py-4 px-6 text-sm text-gray-300">{clase.hora_inicio}</td>
                      <td className="py-4 px-6 text-sm text-gray-300">{clase.hora_fin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {mostrarClases && (
            <Horario listadoClases={clasesHorario} />
          )}
        </section>

        <section className="mt-5 mb-5 rounded-xl p-6 bg-gray-800 shadow-lg border border-gray-700">
          <h2 className='text-xl font-bold text-white mb-4'>Horas Disponibles</h2>
          <button onClick={handleHorarios} className="bg-blue-500 text-white p-2 rounded">
            {mostrarHorarios ? "Mostrar tabla" : "Mostrar horario"}
          </button> 
          {mostrarHorarios && (
            <HorarioDisponible profesorId={idNumber} />
          )}

          {!mostrarHorarios && (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Día</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hora Inicio</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hora Fin</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {horarios.map((horario) => (
                    <tr key={horario.id} className="hover:bg-gray-700 transition-colors duration-200">
                      <td className="py-4 px-6 text-sm text-gray-300">{horario.dia}</td>
                      <td className="py-4 px-6 text-sm text-gray-300">{horario.hora_inicio}</td>
                      <td className="py-4 px-6 text-sm text-gray-300">{horario.hora_fin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default VerProfesor;