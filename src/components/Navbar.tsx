import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
       <ul>
        <li><Link to="/horario">Horario</Link> </li>
        <li><Link to="/profesores"> Profesores </Link></li>
        </ul> 
    </div>
  )
}
