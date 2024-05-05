import { useDrag } from "react-dnd";


interface DragComponentProps {
  dia: string;
  horaInicio: string;
  horaFin: string;
}




const DragClase: React.FC<DragComponentProps> = ({ dia, horaInicio,horaFin }) => {

  const [{ isDragging }, drag] = useDrag({
  type: 'box',
  item: { id: 'unique_id', dia, horaInicio, horaFin }, // Puedes pasar las propiedades directamente aquí
  collect: monitor => ({
    isDragging: monitor.isDragging(),
    // Acceder a las propiedades del objeto en el momento del arrastre
    dia: monitor.getItem()?.dia,
    horaInicio: monitor.getItem()?.horaInicio,
    horaFin: monitor.getItem()?.horaFin
  }),
});
console.log('Props pasados a DragClase:', { dia, horaInicio, horaFin });


  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'pointer',
        border: '1px solid',
        padding: '8px',
        color:"white",
        margin: '4px',
      }}
      className="bg-slate-800 rounded-md shadow-sm shadow-slate-500"
    >


      <p>{dia}</p>
      <p>{horaInicio}</p>
      <p>{horaFin}</p>

      Drag me!
    </div>
  );
};
export default DragClase