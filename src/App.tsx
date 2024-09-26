
import { Route, Routes, Navigate } from 'react-router-dom';
import { ReactNode, useContext, useEffect, useState } from 'react';
import Horario from './views/Horario.tsx';
import Profesores from './views/Profesores';
import CrearProfesor from './views/CrearProfesor.tsx';
import Profesor from './views/Profesor';
import Login from './views/Login.tsx';
import Error from './views/Login.tsx';
import Materias from './views/Materias.tsx';
import { AuthProvider } from './context/AuthContext.tsx';



import { Triangle } from 'react-loader-spinner';
import ProtectedRoute from './context/ProtectedRoute';
import Salones from './views/Salones.tsx';
import Clases from './views/Clases.tsx';
import EditarProfesor from './views/EditProfesor.tsx';
import Perfil from './views/Perfil.tsx';
import CrearProfesorMateria from './views/ProfesorMateria.tsx';
import CrearHorarioDisponible from './views/horariosDisponibles.tsx';








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
          <Route path="/materias" element={ <ProtectedRoute><Materias /></ProtectedRoute>} />
          <Route path="/profesormateria" element={ <ProtectedRoute><CrearProfesorMateria /></ProtectedRoute>} />
          <Route path="/salones" element={ <ProtectedRoute><Salones /></ProtectedRoute>} />
          <Route path="/horariosdisponibles" element={ <ProtectedRoute><CrearHorarioDisponible /></ProtectedRoute>} />
          <Route path="/clases" element={ <ProtectedRoute><Clases /></ProtectedRoute>} />
          <Route path="/perfil" element={ <ProtectedRoute><Perfil /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
