import axios from 'axios';
import { useState } from 'react'
import Navbar from '../components/Navbar';
export default function CrearProfesor() {


  const [profesor, setProfesor] = useState({
    cedula: '',
    nombre: '',
    tipoContrato: '',
    materias: '',
    horariosDisponibles: ''
  });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setProfesor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(profesor); 
      try {
      const response = await axios.post('URL_DEL_ENDPOINT', profesor);
      console.log(response.data);
    
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };



    
  return (
    <div>
        
        <Navbar />
      <form onSubmit={handleSubmit} className='pt-20 bg-slate-700 '>
        <div>
          <label htmlFor="cedula">Cédula:</label>
          <input type="text" id="cedula" name="cedula" value={profesor.cedula} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={profesor.nombre} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="tipoContrato">Tipo de Contrato:</label>
          <input type="text" id="tipoContrato" name="tipoContrato" value={profesor.tipoContrato} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="materias">Materias:</label>
          <input type="text" id="materias" name="materias" value={profesor.materias} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="horariosDisponibles">Horarios Disponibles:</label>
          <input type="text" id="horariosDisponibles" name="horariosDisponibles" value={profesor.horariosDisponibles} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form> 
    </div>
  )
}
