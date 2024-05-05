import { ReactNode, useState } from "react";
import { useDrop } from "react-dnd";


interface DropComponentProps {
  dia: string;
  horaInicio: string;
  horaFin: string;
  onDrop: (propsToPass: { dia: string; horaInicio: string,horaFin:string }) => void;
  onDropItems:(propsToPass: { dia: string; horaInicio: string,horaFin:string }) => void;
  children?: ReactNode
}


const DropClase: React.FC<DropComponentProps> = ({ dia, horaInicio, horaFin, onDrop,onDropItems, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'box',

      drop: (item: any) => {
        const { horaFin, dia, horaInicio } = item;
    // Agrupa las variables en un objeto antes de llamar a onDrop
        onDropItems({ dia, horaInicio,  horaFin}); 
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleDrop = () => {
    const propsToPass = {
      dia: dia,
      horaInicio: horaInicio,
      horaFin: horaFin,
    };
    onDrop(propsToPass);
  };

  return (
    <div
      ref={drop}
      style={{
        border: '1px solid black',
        backgroundColor: isOver ? 'lightgray' : 'white',
      }}
      onDrop={handleDrop}
      className="w-full min-h-10 h-full "
    >
      {children}
    </div>
  );
};

export default DropClase
