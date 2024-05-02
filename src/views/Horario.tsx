import { useEffect, useState } from "react";
import { getClases } from "../data/conexiones"
import Navbar from "../components/Navbar";

export default function Horario() {
  const [clases, setClases] = useState<any>(null);
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
    <div>
      <Navbar />
      
 
      <table>
          <tr>
              <th>Hora</th>
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miércoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
              <th>Sábado</th>
          </tr>
          <tr>
              <td>8:00 - 9:00</td>
              <td>Clase</td>
              <td>Clase</td>
              <td>Clase</td>
              <td>Clase</td>
              <td>Clase</td>
              <td>Descanso</td>
          </tr>
          <tr>
              <td>9:00 - 10:00</td>
              <td>Reunión</td>
              <td>Trabajo</td>
              <td>Trabajo</td>
              <td>Proyecto</td>
              <td>Trabajo</td>
              <td>Descanso</td>
          </tr>
      </table>


    </div>

  )
}
