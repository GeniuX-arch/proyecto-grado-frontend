
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DropClase from "../components/DropClase";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragClase from "../components/DragClase";
import CrearClase from "./CrearClase";
 // Ajusta la ruta según sea necesario



//sumatoria de numeros
function sumarMinutos(hora: string, minutos: number): string {
  // Dividir la hora en horas y minutos
  const [horas, minutosHora] = hora.split(":").map(Number);
  
  // Crear un nuevo objeto Date con la hora proporcionada
  const fecha = new Date();
  fecha.setHours(horas);
  fecha.setMinutes(minutosHora);
  
  // Sumar los minutos
  fecha.setMinutes(fecha.getMinutes() + minutos);
  
  // Obtener la nueva hora y minutos
  const nuevaHora = fecha.getHours();
  const nuevosMinutos = fecha.getMinutes();
  
  // Devolver la nueva hora en formato HH:MM
  return `${nuevaHora < 10 ? "0" + nuevaHora : nuevaHora}:${nuevosMinutos < 10 ? "0" + nuevosMinutos : nuevosMinutos}`;
}




    interface horario {
        dia: string,
        horaInicio: string,
        horaFin: string
    }



    //lista de clases de prueba
  const listadoClases: horario[] = [
      {
        dia: 'lunes',
        horaInicio: '06:00',
        horaFin: '06:45'
    },
    {
        dia: 'lunes',
        horaInicio: '06:45',
        horaFin: '07:30'
    },
    {
        dia: 'lunes',
        horaInicio: '07:30',
        horaFin: '08:15'
    },
    {
        dia: 'lunes',
        horaInicio: '08:15',
        horaFin: '09:00'
    },
    {
        dia: 'lunes',
        horaInicio: '09:00',
        horaFin: '09:45'
    }

    ];


export default function Horario() {
    let horaFin: string = "06:00";
    let hora: string="05:15"
    let horaInicio: string;
    const dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];


  
    const [props, setProps] = useState<horario>();
    const [clases, setClases] = useState<horario[]>(listadoClases);
    const [horarioo, setHorarioo] = useState<Array<Array<Array<horario>>>>([[[]]]); //array de 3 dimenciones
      /*
    useEffect(() => {
        const fetchClases = async () => {
            try {
                const data = await getClases();
                setClases(data);
            } catch (error) {}
        };

        fetchClases();
    }, []);
    */


    //Creación del horario completo
   useEffect(() => {
    const updateHorarioo = () => {
        const newHorarioo: Array<Array<Array<horario>>> = Array.from({ length: 18 }, (_, ) => {
                horaInicio = horaFin;
                const minutosASumar: number = 45;
                horaFin = sumarMinutos(horaInicio, minutosASumar);

            const updatedHorarioo: Array<Array<horario>> = dias.map((dia) => {
                const clasesFiltradas = clases.filter(clase =>
                    clase.dia === dia &&
                    clase.horaInicio === horaInicio &&
                    clase.horaFin === horaFin
                );
                return clasesFiltradas;
            });

            return updatedHorarioo;
        });

        setHorarioo(newHorarioo);
    };

    updateHorarioo();
}, [clases]); // Solo ejecutar el efecto cuando el estado de clases cambie
 

    return (
        <>
            <Navbar />
            <CrearClase />
            <div className=" min-h-screen flex flex-row justify-center items-center pt-24">
                
                
                <table className="table-auto border-collapse border border-solid border-gray-200 w-11/12">
                    <thead>
                        <tr className="lg:flex lg:flex-row grid grid-cols-7">
                            <th className="border border-gray-300 lg:w-32 text-center items-center flex justify-center shadow-gray-200 shadow-sm border-solid">Hora</th>
                            {dias.map((dia, index) => (
                                <th key={index} className="border h-12 text-center flex justify-center items-center border-gray-300  border-solid shadow-gray-200 shadow-sm lg:w-1/6">{dia}</th>

                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <DndProvider backend={HTML5Backend}>
                            {horarioo.map((horaRow, rowIndex) => {
                              hora=sumarMinutos(hora,45)
                            return(
                              
                                <tr key={rowIndex} className="lg:flex lg:flex-row grid grid-cols-7">
                                    <td className="border  p-2 text-center lg:w-32 border-gray-300 shadow-gray-200 shadow-sm border-solid">

                                        {hora}-{sumarMinutos(hora,45)}
                                    </td>
                                    {horaRow.map((diaClases, diaIndex) => {
                                     
                                    return(
                                        <td key={diaIndex} className="border border-gray-200 p-2 lg:w-1/6 border-solid">
                                            <DropClase 
                                                dia={dias[diaIndex]}
                                                horaInicio={hora} 
                                                horaFin={sumarMinutos(hora,45)} 
                                                onDrop={(propsToPass) => {

                                                   // Crear una copia del array listadoClases
                                              setProps(
                                                {
                                                      dia: propsToPass.dia,
                                                      horaInicio: propsToPass.horaInicio,
                                                      horaFin: propsToPass.horaFin,
                                                }
                                              )
                                              
                                                }}
                                              onDropItems={(propsToPass)=>{

                                              const updatedClases = [...clases];
                                              const index = updatedClases.findIndex(clase => 
                                                  clase.dia === propsToPass.dia &&
                                                  clase.horaInicio === propsToPass.horaInicio &&
                                                  clase.horaFin === propsToPass.horaFin
                                              );
                                              
                                              
                                              // Verificar si se encontró el elemento
                                              if (index !== -1) {
                                                  // Actualizar el elemento con los nuevos datos

                                                if(props){
                                                  updatedClases[index] = {
                                                      dia: props.dia,
                                                      horaInicio: props.horaInicio,
                                                      horaFin: props.horaFin,
                                                  };
                                                  
                                                  // Reemplazar listadoClases con la copia actualizada
                                                  setClases(updatedClases);
                                                }
                                              } else {
                                                  console.error('No se encontró el elemento en listadoClases');
                                              }
                                              
                                              }}
                                              
                                            >
                                                {diaClases.map((clase, claseIndex) => (
                                                    <DragClase
                                                        key={claseIndex}
                                                        dia={clase.dia}
                                                        horaInicio={clase.horaInicio}
                                                        horaFin={clase.horaFin}
                                                    />
                                                ))}
                                            </DropClase>
                                        </td>
                                    )})}
                                </tr>
                            )})}
                        </DndProvider>
                    </tbody>
                </table>
            </div>
        </>
    );
}
