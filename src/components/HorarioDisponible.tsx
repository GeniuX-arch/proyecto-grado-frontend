import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import axios from "axios";
import { host } from "../data/server";

interface Clase {
  id?: number;
  dia: string;
  hora_inicio: string; // Keep original naming
  hora_fin: string;    // Keep original naming
  seleccionado?: boolean;
}

export interface Horario {
  id?: number;
  grupo: string;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
  alumnos: number;
  materia_id?: number;
  profesor_id?: number;
  salon_id?: number;
    profesor_nombre?: string;
    materia_nombre?: string;
    salon_codigo?: string;
}

export default function HorarioDisponible({
  profesorId,
}: {
  profesorId: number;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  const horas = [
    "06:00", "06:45", "07:30", "08:15", "09:00", "09:45",
    "10:30", "11:15", "12:00", "12:45", "13:30", "14:15",
    "15:00", "15:45", "16:30", "17:15", "18:00", "18:45",
  ];

  const [horarioo, setHorarioo] = useState<Array<Array<Clase>>>(
    horas.map((hora, index) =>
      dias.map((dia) => ({
        dia,
        hora_inicio: hora,
        hora_fin: horas[index + 1] || "N/A", // Set hora_fin to the next time slot
        seleccionado: false,
      }))
    )
  );

  useEffect(() => {
    // Fetch schedule based on the professor's ID
    async function fetchSchedule() {
      try {
        const response = await axios.get(
          `${host}/horarios_disponibles?profesor_id=${profesorId}`
        );
        const clasesProfesor: Horario[] = response.data;

        const updatedHorarioo = horarioo.map((horaRow) =>
          horaRow.map((clase) => {
            const claseExistente = clasesProfesor.find(
              (cl: Horario) => cl.dia === clase.dia && cl.hora_inicio === clase.hora_inicio
            );
            return claseExistente
              ? { ...clase, seleccionado: true, id: claseExistente.id }
              : clase;
          })
        );
        setHorarioo(updatedHorarioo);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error al obtener el horario:", error);
      }
    }

    if (profesorId) fetchSchedule();
  }, [profesorId]);


  const handleCellClick = async (diaIndex: number, horaIndex: number) => {
    const claseSeleccionada = horarioo[horaIndex][diaIndex];
    const nuevoSeleccionado = !claseSeleccionada.seleccionado;

    setHorarioo((prevHorarioo) =>
      prevHorarioo.map((horaRow, hIndex) =>
        horaRow.map((clase, dIndex) =>
          hIndex === horaIndex && dIndex === diaIndex
            ? { ...clase, seleccionado: nuevoSeleccionado }
            : clase
        )
      )
    );

    try {
      if (nuevoSeleccionado) {
        console.log(
            {dia: claseSeleccionada.dia,
          hora_inicio: claseSeleccionada.hora_inicio, // Correct property naming
          hora_fin: claseSeleccionada.hora_fin,       // Correct property naming
          profesorId});

        const response = await axios.post(`${host}/horarios_disponibles`, {
          dia: claseSeleccionada.dia,
          hora_inicio: claseSeleccionada.hora_inicio,
          hora_fin: claseSeleccionada.hora_fin,
          profesor_id:profesorId,
        });

        setHorarioo((prevHorarioo) =>
          prevHorarioo.map((horaRow, hIndex) =>
            horaRow.map((clase, dIndex) =>
              hIndex === horaIndex && dIndex === diaIndex
                ? { ...clase, id: response.data.id }
                : clase
            )
          )
        );
      } else {
        await axios.delete(`${host}/horarios_disponibles/${claseSeleccionada.id}`);
      }
    } catch (error) {
      console.error("Error al actualizar la clase:", error);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Triangle />
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent bg-fixed bg-cover bg-center text-white pt-4">
      <div className="container mx-auto ">
        <table className="table-auto border-collapse border border-gray-700 w-full bg-gray-800 bg-opacity-70 rounded-xl shadow-lg">
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
            {horarioo.map((horaRow, horaIndex) => (
              <tr key={horaIndex} className="hover:bg-gray-700 transition duration-200">
                <td className="border border-gray-600 p-2 text-center">
                  {horas[horaIndex]} - {horas[horaIndex + 1] || "N/A"}
                </td>
                {horaRow.map((clase, diaIndex) => (
                  <td
                    key={diaIndex}
                    className={`border border-gray-600 p-2 cursor-pointer ${
                      clase.seleccionado ? "bg-green-600" : "bg-gray-800"
                    }`}
                    onClick={() => handleCellClick(diaIndex, horaIndex)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
