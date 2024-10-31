import { useDrag } from "react-dnd";

interface DragComponentProps {
  dia: string;
  horaInicio: string;
  horaFin: string;
  idd?:number;
  titulo?:string;
  descripcion?:string;
  onClick: () => void; // Agrega la prop onClick
}

const DragClase: React.FC<DragComponentProps> = ({ dia, idd, horaInicio, horaFin,titulo,descripcion, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'box',
    item: { id: 'unique_id', dia, horaInicio, idd, horaFin,titulo,descripcion },
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
      className="bg-gray-100 text-center text-sm rounded-md"
      onClick={onClick} // Usa la prop onClick
    >
      <p>{titulo}</p>
      <p>{descripcion}</p>
    </div>
  );
};

export default DragClase;
