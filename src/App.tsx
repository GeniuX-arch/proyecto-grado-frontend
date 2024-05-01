import {  Route, Routes } from 'react-router-dom'
import Horario from './views/Horario'
import './App.css'

function App() {

  return (
        <Routes>
          <Route path="/" element={ <Horario /> } />
        </Routes>
        
     
  )
}

export default App
