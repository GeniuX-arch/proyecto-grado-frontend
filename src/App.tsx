import {  Route, Routes } from 'react-router-dom'
import Horario from './views/Horario'
import './App.css'
import Profesores from './views/Profesores'
import CrearProfesor from './views/CrearProfesor'
import Profesor from './views/Profesor'
import Login from './views/Login'

function App() {

  return (
        <Routes>
          <Route path="/horario" element={ <Horario /> } />
          <Route path="/" element={ <Profesores /> } />
          <Route path="/profesor/:id" element={ <Profesor /> } />
          <Route path="/profesor/crear" element={ <CrearProfesor /> } />
          <Route path="/login" element={ <Login /> } />
        </Routes>
        
     
  )
}

export default App
