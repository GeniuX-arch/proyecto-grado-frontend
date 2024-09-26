
import { Route, Routes, Navigate } from 'react-router-dom';
import { ReactNode, useContext, useEffect, useState } from 'react';
import Horario from './views/Horario.tsx';
import Profesores from './views/profesores/Profesores.tsx';
import CrearProfesor from './views/profesores/CrearProfesor.tsx';
import Profesor from './views/Profesor';
import Login from './views/Login.tsx';
import Error from './views/Login.tsx';
import Materias from './views/materias/Materias.tsx';
import { AuthProvider } from './context/AuthContext.tsx';



import { Triangle } from 'react-loader-spinner';
import ProtectedRoute from './context/ProtectedRoute';
import Salones from './views/salones/Salones.tsx';
import Clases from './views/clases/Clases.tsx';
import EditarProfesor from './views/profesores/EditProfesor.tsx';
import Perfil from './views/Perfil.tsx';
import CrearProfesorMateria from './views/profesor_materia/ProfesorMateria.tsx';
import CrearHorarioDisponible from './views/horarios_disponibles/horariosDisponibles.tsx';
import VisualizarClases from './views/clases/vistaClases.tsx';
import EditarClase from './views/clases/EditClases.tsx';
import VerHorariosDisponibles from './views/horarios_disponibles/vistaHorariosDisponible.tsx';
import VerMaterias from './views/materias/vistaMaterias.tsx';
import CrearMateria from './views/materias/Materias.tsx';
import VisualizarProfesorMateria from './views/profesor_materia/vistaProfesorMateria.tsx';
import VerSalones from './views/salones/vistaSalones.tsx';
import CrearSalon from './views/salones/Salones.tsx';








interface PrivateRouteProps {
  children: ReactNode;
  // Puedes agregar otras propiedades aquí si es necesario
}




/*
function PrivateRoutes({ children }: PrivateRouteProps) {
    const { status,userId } = useContext(AuthContext);
    if (status === 'checking') return <div className='flex flex-col items-center justify-center h-screen'><Triangle /> <p>Revisando credenciales...</p> </div>
    return(
      (status=== 'authenticated' && userId )? <>{children}</> : <Navigate to="/login" />
    )
}
function Intro({ children }: PrivateRouteProps) {
    const { status,userId } = useContext(AuthContext);

    return(
      (status=== 'authenticated' && userId )?  <Navigate to="/" /> : <>{children}</>
    )
}
*/



function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(false); // Cambia a false una vez que los datos estén listos
        };

        loadData();
    }, []);

    if (loading) {
        return <div className='flex flex-col items-center justify-center h-screen'><Triangle /> <p>Revisando credenciales...</p> </div>

    }

  return (
    <AuthProvider>
        <Routes>
          <Route path="/horario" element={ <ProtectedRoute><Horario  /></ProtectedRoute>} />
          <Route path="/" element={ <ProtectedRoute><Profesores /></ProtectedRoute>} />
          <Route path="/profesor/:id" element={<ProtectedRoute><Profesor /></ProtectedRoute>} />
          <Route path="/profesor/crear" element={<ProtectedRoute><CrearProfesor /></ProtectedRoute>} />
          <Route path="/profesor/editar/:id" element={<ProtectedRoute><EditarProfesor /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ProtectedRoute><Error /></ProtectedRoute>} />

          <Route path="/materias" element={ <ProtectedRoute><VerMaterias /></ProtectedRoute>} />
          <Route path="/materias/crear" element={ <ProtectedRoute><CrearMateria /></ProtectedRoute>} />
          
          <Route path="/profesormateria" element={ <ProtectedRoute><VisualizarProfesorMateria /></ProtectedRoute>} />
          <Route path="/profesormateria/crear" element={ <ProtectedRoute><CrearProfesorMateria /></ProtectedRoute>} />

          <Route path="/salones" element={ <ProtectedRoute><VerSalones/></ProtectedRoute>} />
          <Route path="/salones/crear" element={ <ProtectedRoute><CrearSalon/></ProtectedRoute>} />

          <Route path="/vistahorariosdisponibles" element={ <ProtectedRoute><VerHorariosDisponibles /></ProtectedRoute>} />
          <Route path="//horarioDisponibles/crear" element={ <ProtectedRoute><CrearHorarioDisponible /></ProtectedRoute>} />
          
          <Route path="/clases" element={ <ProtectedRoute><Clases /></ProtectedRoute>} />
          <Route path="/vistaClases" element={ <ProtectedRoute><VisualizarClases /></ProtectedRoute>} />
          <Route path="/clase/editar/:id" element={<ProtectedRoute><EditarClase/></ProtectedRoute>} />

          <Route path="/perfil" element={ <ProtectedRoute><Perfil /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
