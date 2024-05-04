import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <ul className='flex flex-row justify-center items-center gap-24 fixed bg-black h-16 w-screen text-white'>
            <li><Link to="/horario">Horario</Link> </li>
            <li><Link to="/"> Profesores </Link></li>
        </ul> 
    </div>
  )
}
