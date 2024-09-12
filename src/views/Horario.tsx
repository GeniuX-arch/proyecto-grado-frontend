import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DropClase from "../components/DropClase";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragClase from "../components/DragClase";
import CrearClase from "./CrearClase";

function sumarMinutos(hora: string, minutos: number): string {
  const [horas, minutosHora] = hora.split(":").map(Number);
  const fecha = new Date();
  fecha.setHours(horas);
  fecha.setMinutes(minutosHora);
  fecha.setMinutes(fecha.getMinutes() + minutos);

  const nuevaHora = fecha.getHours();
  const nuevosMinutos = fecha.getMinutes();
  return `${nuevaHora < 10 ? "0" + nuevaHora : nuevaHora}:${nuevosMinutos < 10 ? "0" + nuevosMinutos : nuevosMinutos}`;
}

interface Horario {
  dia: string;
  horaInicio: string;
  horaFin: string;
}

const listadoClases: Horario[] = [
  { dia: "lunes", horaInicio: "06:00", horaFin: "06:45" },
  { dia: "lunes", horaInicio: "06:45", horaFin: "07:30" },
  { dia: "lunes", horaInicio: "07:30", horaFin: "08:15" },
  { dia: "lunes", horaInicio: "08:15", horaFin: "09:00" },
  { dia: "lunes", horaInicio: "09:00", horaFin: "09:45" },
];

export default function Horario() {
  let horaFin: string = "06:00";
  let hora: string = "05:15";
  let horaInicio: string;
  const dias = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

  const [props, setProps] = useState<Horario>();
  const [clases, setClases] = useState<Horario[]>(listadoClases);
  const [horarioo, setHorarioo] = useState<Array<Array<Array<Horario>>>>([[[]]]);
  const [selectedClase, setSelectedClase] = useState<Horario | null>(null);

  useEffect(() => {
    const updateHorarioo = () => {
      const newHorarioo: Array<Array<Array<Horario>>> = Array.from(
        { length: 18 },
        () => {
          horaInicio = horaFin;
          const minutosASumar: number = 45;
          horaFin = sumarMinutos(horaInicio, minutosASumar);

          const updatedHorarioo: Array<Array<Horario>> = dias.map((dia) => {
            const clasesFiltradas = clases.filter(
              (clase) =>
                clase.dia === dia &&
                clase.horaInicio === horaInicio &&
                clase.horaFin === horaFin
            );
            return clasesFiltradas;
          });

          return updatedHorarioo;
        }
      );

      setHorarioo(newHorarioo);
    };

    updateHorarioo();
  }, [clases]);

  const handleOpenModal = (clase: Horario) => {
    setSelectedClase(clase);
  };

  const handleCloseModal = () => {
    setSelectedClase(null);
  };

  return (
    <>
      <Navbar />
      <CrearClase />

      {/* Modal para mostrar información de la clase */}
      {selectedClase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Información de la Materia</h2>
            <p><strong>Día:</strong> {selectedClase.dia}</p>
            <p><strong>Hora Inicio:</strong> {selectedClase.horaInicio}</p>
            <p><strong>Hora Fin:</strong> {selectedClase.horaFin}</p>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div
        className="min-h-screen bg-fixed bg-cover bg-center text-white pt-24"
        style={{ backgroundImage: 'url(https://i.ytimg.com/vi/NbHD50edwpc/maxresdefault.jpg)' }}
      >
        <div className="container mx-auto px-4">
          <table className="table-auto border-collapse border border-gray-700 w-full bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
            {/* Agregado bg-opacity-70 para hacer la tabla transparente */}
            <thead>
              <tr className="text-indigo-300 bg-gray-700">
                <th className="border border-gray-600 p-2 text-center">Hora</th>
                {dias.map((dia, index) => (
                  <th key={index} className="border border-gray-600 p-2 text-center">
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <DndProvider backend={HTML5Backend}>
                {horarioo.map((horaRow, rowIndex) => {
                  hora = sumarMinutos(hora, 45);
                  return (
                    <tr key={rowIndex} className="hover:bg-gray-700 transition duration-200">
                      <td className="border border-gray-600 p-2 text-center">
                        {hora}-{sumarMinutos(hora, 45)}
                      </td>
                      {horaRow.map((diaClases, diaIndex) => (
                        <td key={diaIndex} className="border border-gray-600 p-2">
                          <DropClase
                            dia={dias[diaIndex]}
                            horaInicio={hora}
                            horaFin={sumarMinutos(hora, 45)}
                            onDrop={(propsToPass) => {
                              setProps({
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

                              if (index !== -1) {
                                if (props) {
                                  updatedClases[index] = {
                                    dia: props.dia,
                                    horaInicio: props.horaInicio,
                                    horaFin: props.horaFin,
                                  };
                                  setClases(updatedClases);
                                }
                              } else {
                                console.error("No se encontró el elemento en listadoClases");
                              }
                            }}
                          >
                            {diaClases.map((clase, claseIndex) => (
                              <DragClase
                                key={claseIndex}
                                dia={clase.dia}
                                horaInicio={clase.horaInicio}
                                horaFin={clase.horaFin}
                                onClick={() => handleOpenModal(clase)} // agregue la funcion, me da paja comentar
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
