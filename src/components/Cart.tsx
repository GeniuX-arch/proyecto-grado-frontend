import React from 'react'
import {Profesor} from '../interfaces/interfaces'
import { Link } from 'react-router-dom';




    export default function Cart(informacion: Profesor[]) {

  return (
    <div>
      {informacion.map((info:Profesor, index: number) => {
        return(
            <div key={index} >
              <Link to={`/profesor/${info.cedula}`}>
                <div>{info.cedula}</div>
                <div>{info.nombre}</div>
                <div>{info.horarioDisponible}</div>
                <div>{info.tipoContrato}</div>
              </Link>
            </div>
        )
      })}
    </div>
  );
}