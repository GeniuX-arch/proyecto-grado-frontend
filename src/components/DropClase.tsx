import { useDrop } from "react-dnd";

interface DropComponentProps {
  onDrop: (propsToPass: { backgroundColor: string; borderColor: string }) => void;
}

const DropClase : React.FC<DropComponentProps> = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'box',
    drop: (item, monitor) => {
      const propsToPass = {
        backgroundColor: 'red',
        borderColor: 'blue'
      };
      onDrop(propsToPass);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        width: 200,
        height: 200,
        border: '1px solid black',
        backgroundColor: isOver ? 'lightgray' : 'white',
      }}
    >
      Drop here!
    </div>
  );
};

export default DropClase



/*

interface DropComponentProps {
  backgroundColor?: string;
  borderColor?: string;
  onDrop: (propsToPass: { backgroundColor: string; borderColor: string }) => void;
}

const DropComponent: React.FC<DropComponentProps> = ({ backgroundColor, borderColor, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'box',
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleDrop = () => {
    const propsToPass = {
      backgroundColor: backgroundColor || 'red',
      borderColor: borderColor || 'blue'
    };
    onDrop(propsToPass);
  };

  return (
    <div
      ref={drop}
      style={{
        width: 200,
        height: 200,
        border: '1px solid black',
        backgroundColor: isOver ? 'lightgray' : 'white',
      }}
      onClick={handleDrop}
    >
      Drop here!
    </div>
  );
};

const App: React.FC = () => {
  const handleDrop = (propsToPass: { backgroundColor: string; borderColor: string }) => {
    console.log('Dropped with props:', propsToPass);
  };

  const dropProps = {
    backgroundColor: 'yellow',
    borderColor: 'green'
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <DragComponent />
        <DropComponent {...dropProps} onDrop={handleDrop} />
      </div>
    </DndProvider>
  );
};

export default App;
*/