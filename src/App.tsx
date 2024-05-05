import {  Route, Routes } from 'react-router-dom'
import Horario from './views/Horario'
import './App.css'
import Profesores from './views/Profesores'
import CrearProfesor from './views/CrearProfesor'

function App() {

  return (
        <Routes>
          <Route path="/horario" element={ <Horario /> } />
          <Route path="/" element={ <Profesores /> } />
          <Route path="/profesor/:id" element={ <Profesores /> } />
          <Route path="/profesor/crear" element={ <CrearProfesor /> } />
        </Routes>
        
     
  )
}

export default App
