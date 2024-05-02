import React from 'react'
import {Profesor} from '../interfaces/interfaces'




function profesorSkill(){

}
export default function Cart(informacion: Profesor[]) {

  return (
    <div>
      {informacion.map((info:Profesor, index: number) => {
        return(
            <div key={index} onClick={profesorSkill}>
                <div>{info.cedula}</div>
                <div>{info.nombre}</div>
                <div>{info.horarioDisponible}</div>
                <div>{info.tipoContrato}</div>
            </div>
        )
      })}
    </div>
  );
}