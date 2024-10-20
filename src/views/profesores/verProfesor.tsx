import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { host, hostImg } from '../../data/server';
import { Triangle } from 'react-loader-spinner';

export default function VerProfesor() {
  const { id } = useParams();
  const [profesor, setProfesor] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [clases, setClases] = useState([]);

  const obtenerNombreMateria = async (materiaId) => {
    try {
      const response = await axios.get(`${host}/materias/${materiaId}`);
      return response.data.nombre;
    } catch (error) {
      console.error('Error al obtener el nombre de la materia:', error);
      return 'Desconocido';
    }
  };

  useEffect(() => {
    const obtenerProfesor = async () => {
      try {
        const response = await axios.get(`${host}/profesores/${id}`);
        setProfesor(response.data);
      } catch (error) {
        console.error('Error al obtener profesor:', error);
      }
    };

    const obtenerMaterias = async () => {
      try {
        const response = await axios.get(`${host}/profesor_materia?profesor_id=${id}`);
        const materiasConNombre = await Promise.all(
          response.data.map(async (materia) => {
            const nombreMateria = await obtenerNombreMateria(materia.materia_id);
            return { ...materia, nombreMateria };
          })
        );
        setMaterias(materiasConNombre);
      } catch (error) {
        console.error('Error al obtener materias:', error);
      }
    };

    const obtenerHorarios = async () => {
      try {
        const response = await axios.get(`${host}/horarios_disponibles?profesor_id=${id}`);
        setHorarios(response.data);
      } catch (error) {
        console.error('Error al obtener horarios:', error);
      }
    };

    const obtenerClases = async () => {
      try {
        const response = await axios.get(`${host}/clases?profesor_id=${id}`);
        setClases(response.data);
      } catch (error) {
        console.error('Error al obtener clases:', error);
      }
    };

    obtenerProfesor();
    obtenerMaterias();
    obtenerHorarios();
    obtenerClases();
  }, [id]);

  if (!profesor) {
    return <div className='flex flex-col items-center justify-center h-screen'><Triangle /> <p>Cargando...</p></div>;
  }

  return (
    <div>
      <Navbar />
      <div className='pt-16 pl-4 md:pl-16 lg:pl-52 pr-6 '>
        <div className="flex flex-row">
          {/* Información del profesor */}
          <section className="border rounded-md p-4 m-5 flex flex-col items-center w-1/3 bg-white shadow-lg">
            <div className='flex flex-col justify-center items-center'>
              <img
                src={profesor.image_path ? hostImg + profesor.image_path : "/perfil.png"}
                alt="Perfil"
                className="h-28 w-28 rounded-full border-4 border-green-600 mb-4"
              />
              <h3 className='text-2xl font-bold'>{profesor.nombre}</h3>
              <div className='flex flex-row gap-2 justify-center items-center'>
                <p className='font-semibold'>Cédula:</p>
                <p>{profesor.cedula}</p>
              </div>
            </div>
          </section>

          {/* Materias */}
          <section className="border rounded-md p-4 m-5 flex flex-col items-center w-2/3 bg-white shadow-lg">
            <h1 className='text-xl font-bold'>Materias que dicta</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {materias.map((materia) => (
                <div key={materia.id} className="border rounded-md p-2 shadow-sm bg-gray-100">
                  <h3 className="font-semibold">{materia.nombreMateria}</h3>
                  <p>Experiencia: {materia.experiencia}</p>
                  <p>Calificación Alumno: {materia.calificacion_alumno}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Clases */}
        <section className="border rounded-md p-4 m-5 bg-white shadow-lg">
          <h2 className='text-xl font-bold'>Clases que dicta</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-green-700">Clase</th>
                  <th className="py-2 px-4 text-green-700">Materia</th>
                  <th className="py-2 px-4 text-green-700">Horario</th>
                </tr>
              </thead>
              <tbody>
                {clases.map((clase) => (
                  <tr key={clase.id}>
                    <td className="py-2 px-4">{clase.dia_semana}</td>
                    <td className="py-2 px-4">{clase.hora_inicio}</td>
                    <td className="py-2 px-4">{clase.hora_fin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Horarios disponibles */}
        <section className="border rounded-md p-4 m-5 bg-white shadow-lg">
          <h2 className='text-xl font-bold'>Horarios disponibles</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-green-700">Día</th>
                  <th className="py-2 px-4 text-green-700">Hora Inicio</th>
                  <th className="py-2 px-4 text-green-700">Hora Fin</th>
                </tr>
              </thead>
              <tbody>
                {horarios.map((horario) => (
                  <tr key={horario.id}>
                    <td className="py-2 px-4">{horario.dia}</td>
                    <td className="py-2 px-4">{horario.hora_inicio}</td>
                    <td className="py-2 px-4">{horario.hora_fin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
