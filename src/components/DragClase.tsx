import { useDrag } from "react-dnd";


interface DragComponentProps {
  backgroundColor?: string;
  borderColor?: string;
}

const DragClase: React.FC<DragComponentProps> = ({ backgroundColor, borderColor }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'box',
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'pointer',
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        border: '1px solid',
        padding: '8px',
        margin: '4px',
        display: 'inline-block'
      }}
    >
      Drag me!
    </div>
  );
};
export default DragClase