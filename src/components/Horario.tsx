import { useEffect, useState } from "react";
import DropClase from "./DropClase";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragClase from "./DragClase";
import { Triangle } from "react-loader-spinner";

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
  id?: number;
  titulo?: string;
  descripcion?: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
}

export default function Horario({ listadoClases }: { listadoClases: Horario[] }) {
    const [props, setProps] = useState<Horario | null>(null);
  const dias = ["lunes", "martes", "miércoles", "jueves", "viernes", "sabado"];
  const [clases, setClases] = useState<Horario[]>([]);
  const [horarioo, setHorarioo] = useState<Array<Array<Array<Horario>>>>([[]]);
  const [selectedClase, setSelectedClase] = useState<Horario | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  

  useEffect(() => {
    if (listadoClases.length > 0) {
      setClases(listadoClases);
      setIsLoaded(true);
    }
  }, [listadoClases]);

  useEffect(() => {
    if (isLoaded) {
      const updateHorarioo = () => {
        const newHorarioo: Array<Array<Array<Horario>>> = Array.from({ length: 18 }, (_, index) => {
          const currentHora = sumarMinutos("06:00", 45 * index); // Initial start time
          const horaFin = sumarMinutos(currentHora, 45); // Calculate end hour

          const updatedHorarioo = dias.map((dia) => {
            return clases.filter(
              (clase) => clase.dia === dia && clase.horaInicio === currentHora && clase.horaFin === horaFin
            );
          });

          return updatedHorarioo;
        });

        setHorarioo(newHorarioo);
      };

      updateHorarioo();
    }
  }, [clases, isLoaded]);

  const handleOpenModal = (clase: Horario) => {
    setSelectedClase(clase);
  };

  const handleCloseModal = () => {
    setSelectedClase(null);
  };

  if (!isLoaded) {
    return <div className='flex flex-col items-center justify-center h-screen'><Triangle /> <p>Cargando...</p></div>
  }

  return (
    <>
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

      <div className="min-h-screen bg-fixed bg-cover bg-center text-white pt-24"
        style={{ backgroundImage: 'url(https://motionbgs.com/media/490/alone-hollow-knight.jpg)' }}>
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
                  const hora = sumarMinutos("06:00", 45 * rowIndex); // Updated calculation for each row
                  const currentHora = sumarMinutos(hora, 45);
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
    } else {
      console.error("No se encontró el elemento en listadoClases");
    }
  }}
>
  {diaClases.map((clase, claseIndex) => (
    <DragClase
      key={claseIndex}
      dia={clase.dia}
      idd={clase.id}
      horaInicio={clase.horaInicio}
      horaFin={clase.horaFin}
      titulo={clase.titulo}
      descripcion={clase.descripcion}
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