import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { host, hostImg } from '../../data/server';
import { Triangle } from 'react-loader-spinner';
import { Upload, X } from 'lucide-react';

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
  nombreMateria: string;
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
}

// Servicio para actualizar la imagen
// Servicio para actualizar la imagen
// Función para actualizar la imagen del profesor
const actualizarImagenProfesor = async (id: string, archivoImagen: File, setImagePreview: (url: string) => void) => {
  try {
    const formData = new FormData();
    formData.append("image", archivoImagen);

    const response = await axios.put(`${host}/profesores/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Actualizar la vista previa de la imagen con una marca de tiempo para evitar caché
    setImagePreview(`${hostImg}${response.data.image_path}?timestamp=${Date.now()}`);
    console.log("Imagen actualizada correctamente:", response.data);
  } catch (error) {
    if (error.response) {
      console.log("Error en la respuesta del servidor:", error.response.data);
    } else if (error.request) {
      console.log("La solicitud fue hecha, pero no hubo respuesta del servidor", error.request);
    } else {
      console.log("Error al configurar la solicitud:", error.message);
    }
    console.log("Error completo:", error);
  }
};



const obtenerNombreMateria = async (materiaId) => {
  try {
    const response = await axios.get(`${host}/materias/${materiaId}`);
    return response.data.nombre;
  } catch (error) {
    console.error('Error al obtener el nombre de la materia:', error);
    return 'Desconocido';
  }
};

export default function VerProfesor() {
  const { id } = useParams<{ id: string }>();
  const [profesor, setProfesor] = useState<Profesor | null>(null);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [clases, setClases] = useState<Clase[]>([]);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const obtenerProfesor = async () => {
    try {
      const response = await axios.get(`${host}/profesores/${id}`);
      setProfesor(response.data);
      setImagePreview(response.data.image_path ? `${hostImg}${response.data.image_path}` : null);
    } catch (error) {
      console.error('Error al obtener profesor:', error);
      setMensaje('Error al cargar los datos del profesor');
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

  useEffect(() => {
    if (id) {
      obtenerProfesor();
      obtenerMaterias();
      obtenerHorarios();
      obtenerClases();
    }
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Validar el tamaño del archivo (por ejemplo, máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMensaje('La imagen no debe superar los 5MB');
        return;
      }

      // Validar el tipo de archivo
      if (!file.type.startsWith('image/')) {
        setMensaje('Por favor, selecciona un archivo de imagen válido');
        return;
      }

      setNewImage(file);
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setNewImage(null);
    setImagePreview(profesor?.image_path ? `${hostImg}${profesor.image_path}` : null);
    setFileName('');
  };

  const handleImageUpload = async () => {
    if (!newImage || !id) return;
  
    setLoading(true);
    setMensaje('');
  
    try {
      await actualizarImagenProfesor(id, newImage, setImagePreview);
      await obtenerProfesor();
      setNewImage(null);
      setFileName('');
      setMensaje('Imagen actualizada exitosamente');
      
    } catch (error: any) {
      console.error('Error al actualizar la imagen:', error);
      setMensaje(error.response?.data?.message || 'Error al actualizar la imagen');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta materia?')) {
      try {
        await axios.delete(`${host}/materias/${id}`);
        setMaterias((prevState) => prevState.filter((materia) => materia.id !== id));
        setMensaje('Materia eliminada con éxito.');
      } catch (error) {
        console.error('Error al eliminar la materia:', error);
        setMensaje('Error al eliminar la materia.');
      }
    }
  };

  const handleImageClick = () => {
    document.getElementById('imageInput')?.click();
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-24 pl-4 md:pl-16 lg:pl-52 pr-6 pb-5">
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
                  src={imagePreview || (profesor?.image_path ? `${hostImg}${profesor.image_path}` : "/perfil.png")}
                  alt="Perfil"
                  className="h-32 w-32 rounded-full border-4 border-green-500 mb-4 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Upload className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <input
                type="file"
                id="imageInput"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              
              {/* Información detallada del profesor */}
              <h3 className="text-2xl font-bold text-white mb-2">{profesor?.id}</h3>
              
              <div className="text-gray-300">
                <p className="font-semibold">Cédula: <span className="font-normal">{profesor?.cedula}</span></p>
                <p className="font-semibold">nombre: <span className="font-normal">{profesor?.nombre}</span></p>
                <p className="font-semibold">Tipo de Contrato: <span className="font-normal">{profesor?.tipo_contrato}</span></p>
                <p className="font-semibold">Estado: <span className="font-normal">{profesor?.estado}</span></p>
                <Link
                          to={`/profesor/editar/${profesor?.id}`}
                          className="flex items-center justify-center mt-4 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
              </div>

              {newImage && (
                <div className="mt-4 w-full max-w-sm">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300 truncate">{fileName}</span>
                      <button
                        onClick={handleRemoveImage}
                        className="text-red-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <button
                      onClick={handleImageUpload}
                      disabled={loading}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Triangle color="#ffffff" height={16} width={16} />
                          <span>Subiendo...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Guardar imagen</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>


                {/* Materias */}
                <section className="border rounded-md p-4 m-5 flex flex-col items-center w-2/3 bg-gray-800 shadow-lg pt-4">
            <h1 className='text-xl font-bold text-white'>Materias que dicta</h1>

            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {materias.map((materia) => (
               <div key={materia.id} className="border rounded-md p-2 shadow-sm bg-gray-700">
                  <h3 className="font-semibold text-white">{materia.nombreMateria}</h3>
                  <p>Experiencia: {materia.experiencia}</p>
                  <p>Calificación Alumno: {materia.calificacion_alumno}</p>
                  <Link
                          to={`/materias/editar/${materia.id}`}
                          className="flex items-center justify-center mt-4 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
            onClick={() => handleDelete(materia.id)}
            className="flex items-center justify-center p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
                </div>
              ))}
            </div>
            <div>
              
            </div>
          </section>
        </div>

        {/* Clases */}
        <section className="mt-5 rounded-xl p-6 bg-gray-800 shadow-lg border border-gray-700">
          <h2 className='text-xl font-bold text-white mb-4'>Clases Asignadas</h2>
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
        </section>

        {/* Horarios disponibles */}
        <section className="mt-5 mb-5 rounded-xl p-6 bg-gray-800 shadow-lg border border-gray-700">
          <h2 className='text-xl font-bold text-white mb-4'>Horarios Disponibles</h2>
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
        </section>
      </div>
    </div>
  );
}