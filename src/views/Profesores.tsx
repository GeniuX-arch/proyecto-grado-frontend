import React from 'react'
import Navbar from '../components/Navbar'

export default function Profesores() {
  return (
    <>
        <Navbar />
    <div className='text-white bg-slate-950 min-h-screen flex flex-col items-center pt-24'>
         <h1 className='text-2xl'>Listado de profesores</h1>
        
        <div className='w-11/12 mt-5'>
          <div className='items-center text-center grid grid-cols-2 gap-2 h-14 '>
            <div className='items-center text-center grid grid-cols-3 gap-2 h-14'>
              <p>cedula</p>
              <p>nombres</p>
              <p>tipocontrato</p>
            </div>
            <div className='flex justify-center'>Materias</div>
          </div>
              <div className='bg-slate-800 items-center text-center grid grid-cols-2 gap-2 h-20 rounded-md mb-3 '>
                <div className='items-center text-center grid grid-cols-3 gap-2 h-20'>
                <div className='flex justify-center items-center gap-10'><img src="../../public/perfil.jpg" alt="" className='h-16 rounded-full' /> <p>12164888791</p></div>
                <p>Pepito perez</p>
                <p>tipoContrato</p>
                </div>
                <ul className='flex justify-center gap-4'>
                  <li>materia1</li>
                  <li>materia2</li>
                  <li>materia3</li>

                </ul>
              </div>
              <div className='bg-slate-800 items-center text-center grid grid-cols-2 gap-2 h-20 rounded-md mb-3'>
                <div className='items-center text-center grid grid-cols-3 gap-2 h-20'>
                <div className='flex justify-center items-center gap-10'><img src="../../public/perfil.jpg" alt="" className='h-16 rounded-full' /> <p>12164888791</p></div>
                <p>Pepito perez</p>
                <p>tipoContrato</p>
                </div>
                <ul className='flex justify-center gap-4'>
                  <li>materia1</li>
                  <li>materia2</li>
                  <li>materia3</li>

                </ul>
              </div>
        </div>

    </div>
    </>
  )
}
