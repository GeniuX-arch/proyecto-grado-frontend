import { useDrag } from "react-dnd";

interface DragComponentProps {
  dia: string;
  horaInicio: string;
  horaFin: string;
  onClick: () => void; // Agrega la prop onClick
}

const DragClase: React.FC<DragComponentProps> = ({ dia, horaInicio, horaFin, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'box',
    item: { id: 'unique_id', dia, horaInicio, horaFin },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


  //diseño del godddddd
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'pointer',
        padding: '8px',
        color: "black",
        margin: '4px',
      }}
      className="bg-green-200 rounded-md"
      onClick={onClick} // Usa la prop onClick
    >
      <p>{dia}</p>
      <p>{horaInicio}</p>
      <p>{horaFin}</p>
      Drag me!
    </div>
  );
};

export default DragClase;
