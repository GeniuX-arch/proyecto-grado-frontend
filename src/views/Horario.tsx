import { useEffect, useState } from "react";
import { getClases } from "../data/conexiones"
import Navbar from "../components/Navbar";

export default function Horario() {
  interface horarioo  {
    horaInicio:String,
    horaFin:String,
    Dia:String,
  }
  const [clases, setClases] = useState<any>(null);
  const [horario, setHorario] = useState<horarioo>()
  useEffect(() => {
        const fetchClases = async () => {
            try {
                const data = await getClases();
                setClases(data);
            } catch (error) {
            }
        };

        fetchClases();
    }, []);
  return (
    <>
      <Navbar />
    <div className='text-white bg-slate-950 min-h-screen flex flex-col items-center pt-24'>
      


    

      <table className="table-auto border-collapse border border-gray-400 w-11/12">
        <thead>
          <tr className="grid grid-cols-7">
            <th className="border border-gray-400 ">Hora</th>
            <th className="border border-gray-400">Lunes</th>
            <th className="border border-gray-400">Martes</th>
            <th className="border border-gray-400">Miércoles</th>
            <th className="border border-gray-400">Jueves</th>
            <th className="border border-gray-400">Viernes</th>
            <th className="border border-gray-400">Sábado</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 18 }, (_, i) => (
            <tr key={i} className="grid grid-cols-7">
              <td className="border border-gray-400 p-2">
                {`${6 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '45'} - ${6 + Math.floor((i + 1) / 2)}:${i % 2 === 0 ? '45' : '30'}`}
              </td>
              <td className="border border-gray-400 p-2"></td>
              <td className="border border-gray-400 p-2"></td>
              <td className="border border-gray-400 p-2"></td>
              <td className="border border-gray-400 p-2"></td>
              <td className="border border-gray-400 p-2"></td>
              <td className="border border-gray-400 p-2">
              </td>
            </tr>
          ))}
        </tbody>
      </table>



    </div>
    </>

  )
}
