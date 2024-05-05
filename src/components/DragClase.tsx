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


  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'pointer',
        padding: '8px',
        color:"black",
        margin: '4px',
      }}
      className="bg-green-200 rounded-md "
    >


      <p>{dia}</p>
      <p>{horaInicio}</p>
      <p>{horaFin}</p>

      Drag me!
    </div>
  );
};
export default DragClase