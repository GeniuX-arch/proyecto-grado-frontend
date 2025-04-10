import { useEffect, useState } from "react";
import DropClase from "./DropClase";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragClase from "./DragClase";
import { Triangle } from "react-loader-spinner";
import {  Clase } from "../interfaces/interfaces";
import axios from "axios";
import { host } from "../data/server";
import { Link } from "react-router-dom";

interface Horario {
  id: number; // <- hacer que el id no sea opcional
  titulo?: string;
  descripcion?: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
}
interface Clases {
  id: number;
  titulo?: string;
  descripcion?: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
}

export default function Horario({ listadoClases }: { listadoClases: Horario[] }) {
  const [props, setProps] = useState<Horario | null>(null);
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];
  const [clases, setClases] = useState<Horario[]>([]);
  const [horarioo, setHorarioo] = useState<Array<Array<Array<Horario>>>>([[]]);
  const [selectedClase, setSelectedClase] = useState<Clase | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Array de horas de 45 en 45 minutos
  const horas = [
    "06:00", "06:45", "07:30", "08:15", "09:00", "09:45",
    "10:30", "11:15", "12:00", "12:45", "13:30", "14:15",
    "15:00", "15:45", "16:30", "17:15", "18:00", "18:45"
  ];




  useEffect(() => {

    if (listadoClases.length > 0) {
      setClases(listadoClases);
      setIsLoaded(true);
    }
  }, [listadoClases]);

  useEffect(() => {
    if (isLoaded) {
      const updateHorarioo = () => {
        const newHorarioo: Array<Array<Array<Horario>>> = horas.map((hora, index) => {
          const horaFin = horas[index + 1] || "N/A"; // Obtener la siguiente hora como hora de fin

          return dias.map((dia) => {
            return clases.filter(
              (clase) => clase.dia === dia && clase.horaInicio === hora && clase.horaFin === horaFin
            );
          });
        });

        setHorarioo(newHorarioo);
        
      };


      updateHorarioo();
    }
  }, [clases, isLoaded]);

  const fetchClassDetails = async (claseId: number) => {
    try {
      
      const response = await axios.get(`${host}/clases/${claseId}`);//
      const clase = response.data;

      // Fetch related data based on IDs

      setSelectedClase({
        ...clase,
      });
    } catch (error) {
      console.error("Error al obtener la clase:", error);
    }
  };

  const handleOpenModal = async (clase: Clases) => {
    await fetchClassDetails(clase.id);
    console.log(clase)
  };

  const handleCloseModal = () => {
    setSelectedClase(null);
  };


  const handleUpdateHorario = async (updatedClase: Horario) => {
    try {
      const response = await axios.get(`${host}/clases/${updatedClase.id}`);
      const existingClase = response.data;
      existingClase.dia_semana = updatedClase.dia;
      existingClase.hora_inicio = updatedClase.horaInicio;
      existingClase.hora_fin = updatedClase.horaFin;

      await axios.put(`${host}/clases/${updatedClase.id}`, existingClase);
      console.log("Clase actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar la clase:", error);
    }
  };

   useEffect(() => {
    // Check if listadoClases is undefined, null, empty, or contains only NaN
    const isEmptyOrInvalid = 
      !listadoClases || 
      listadoClases.length === 0 || 
      listadoClases.every(item => item === null || item === undefined || Number.isNaN(item));

    if (isEmptyOrInvalid) {
      setClases([]);
      setIsLoaded(true);
    } else {
      setClases(listadoClases);
      setIsLoaded(true);
    }
  }, [listadoClases]);

  if (!isLoaded) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <Triangle />
        <p>Cargando...</p>
      </div>
    );
  }
    if (clases.length === 0) {
    return (
      <div className="min-h-screen bg-transparent bg-fixed bg-cover bg-center text-white pt-24 flex items-center justify-center">
        <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">No se encontraron clases</h2>
          <p className="text-gray-300 mb-4">No hay clases disponibles en este momento.</p>
         
        </div>
      </div>
    );
  }

  return (
    <>
      {selectedClase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={handleCloseModal} // Close modal on outside click
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-auto text-center"
            onClick={(e) => e.stopPropagation()} // Prevent event bubbling to the overlay
          >
            <h2 className="text-2xl font-bold mb-4 ">Información de la clase</h2>
            <p className="text-lg"><strong>Día:</strong> {selectedClase.dia_semana}</p>
            <p className="text-lg"><strong>Hora Inicio:</strong> {selectedClase.hora_inicio}</p>
            <p className="text-lg"><strong>Hora Fin:</strong> {selectedClase.hora_fin}</p>
            <p className="text-lg"><strong>Materia:</strong> {selectedClase.materia_nombre}</p>
            <p className="text-lg"><strong>Salón:</strong> {selectedClase.salon_codigo}</p>
            <p className="text-lg"><strong>Profesor:</strong> {selectedClase.profesor_nombre}</p>
            <div className="flex flex-row justify-center items-center gap-3">
              <button
                className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 "
                onClick={handleCloseModal}
              >
                Cerrar
              </button>
              <Link to={`/editar-clase/${selectedClase.id}`} className="py-2 px-4 bg-blue-700 mt-4 rounded-lg text-white">editar</Link>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-transparent bg-fixed bg-cover bg-center text-white pt-24">
        <div className="container mx-auto px-4">
          <table className="table-auto border-collapse border border-gray-700 w-full bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
            <thead>
              <tr className="text-indigo-300 bg-gray-700">
                <th className="border border-gray-600 p-2 text-center">Hora</th>
                {dias.map((dia, index) => (
                  <th key={index} className="border border-gray-600 p-2 text-center">{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <DndProvider backend={HTML5Backend}>
                {horarioo.map((horaRow, rowIndex) => {
                  const hora = horas[rowIndex];
                  const currentHora = horas[rowIndex + 1] || "N/A"; // Obtener la siguiente hora
                  return (
                    <tr key={rowIndex} className="hover:bg-gray-700 transition duration-200">
                      <td className="border border-gray-600 p-2 text-center">{hora}-{currentHora}</td>
                      {horaRow.map((diaClases, diaIndex) => (
                        <td key={diaIndex} className="border border-gray-600 p-2">
                          <DropClase
                            dia={dias[diaIndex]}
                            horaInicio={hora}
                            horaFin={currentHora}
                            onDrop={(propsToPass) => {
                              setProps({
                                id: 0, // Provide a default or meaningful id value
                                dia: propsToPass.dia,
                                horaInicio: propsToPass.horaInicio,
                                horaFin: propsToPass.horaFin,
                              });
                            }}
                            onDropItems={(propsToPass) => {
                              const updatedClases = [...clases];
                              const index = updatedClases.findIndex(
                                (clase) =>
                                  clase.dia === propsToPass.dia &&
                                  clase.horaInicio === propsToPass.horaInicio &&
                                  clase.horaFin === propsToPass.horaFin
                              );

                              // Update the class if found, else log an error
                              if (index !== -1 && props) {
                                updatedClases[index] = {
                                  ...updatedClases[index], // Spread existing properties
                                  dia: props.dia,
                                  horaInicio: props.horaInicio,
                                  horaFin: props.horaFin,
                                };
                                setClases(updatedClases);
                                handleUpdateHorario(updatedClases[index]); // Call the update function
                              } else {
                                console.error("No se encontró el elemento en listadoClases");
                              }
                            }}
                          >
                            {
                            diaClases.map((clase, claseIndex) => (
                              <DragClase
                                key={claseIndex}
                                {...clase}
                                onClick={() => handleOpenModal(clase)}
                              />
                            ))}
                          </DropClase>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </DndProvider>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
