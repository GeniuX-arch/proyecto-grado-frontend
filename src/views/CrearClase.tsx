
import React, { Component, useEffect, useState } from 'react';
import { Clase } from '../interfaces/interfaces';



export default function CrearClase() {
  const [clase, setClase] = useState({
    grupo: '',
    dia_semana: '',
    hora_inicio: '',
    hora_fin: '',
    materia_id: '',
    salon_id: ''
  });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setClase(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(clase); 
      try {
        console.log(clase)
    
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };


 


    return (
      <form onSubmit={handleSubmit}>
        <label>
          Grupo:
          <input type="text" name="grupo" value={clase.grupo} onChange={handleChange} />
        </label>
        <label>
          Día de la Semana:
          <input type="text" name="dia_semana" value={clase.dia_semana} onChange={handleChange} />
        </label>
        <label>
          Hora de Inicio:
          <input type="text" name="hora_inicio" value={clase.hora_inicio} onChange={handleChange} />
        </label>
        <label>
          Hora de Fin:
          <input type="text" name="hora_fin" value={clase.hora_fin} onChange={handleChange} />
        </label>
        <label>
          ID de Materia:
          <input type="number" name="materia_id" value={clase.materia_id} onChange={handleChange} />
        </label>
        <label>
          ID de Salón:
          <input type="number" name="salon_id" value={clase.salon_id} onChange={handleChange} />
        </label>
        <button type="submit">Enviar</button>
      </form>
    );

}

