import {  Route, Routes } from 'react-router-dom'
import Horario from './views/Horario'
import './App.css'
import Profesores from './views/Profesores'

function App() {

  return (
        <Routes>
          <Route path="/horario" element={ <Horario /> } />
          <Route path="/" element={ <Profesores /> } />
          <Route path="/profesor/:id" element={ <Profesores /> } />
        </Routes>
        
     
  )
}

export default App
