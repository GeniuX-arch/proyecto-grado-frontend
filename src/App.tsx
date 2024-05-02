import {  Route, Routes } from 'react-router-dom'
import Horario from './views/Horario'
import './App.css'
import Profesores from './views/profesores'

function App() {

  return (
        <Routes>
          <Route path="/" element={ <Horario /> } />
          <Route path="/" element={ <Profesores /> } />
        </Routes>
        
     
  )
}

export default App
