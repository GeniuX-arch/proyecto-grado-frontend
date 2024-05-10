
import { Route, Routes, Navigate } from 'react-router-dom';
import { ReactNode, useContext } from 'react';
import Horario from './views/Horario';
import Profesores from './views/Profesores';
import CrearProfesor from './views/CrearProfesor';
import Profesor from './views/Profesor';
import Login from './views/Login';
import Error from './views/Error';
import { AuthContext,AuthProvider } from './context/authContext';

interface PrivateRouteProps {
  children: ReactNode;
  // Puedes agregar otras propiedades aquí si es necesario
}

function PrivateRoutes({ children }: PrivateRouteProps) {
    const { status,userId } = useContext(AuthContext);
    if (status === 'checking') return <p className="loading"><span>Checking credentials, wait a moment...</span></p>
    return(
      (status=== 'authenticated' && userId )? <>{children}</> : <Navigate to="/login" />
    )
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/horario" element={<PrivateRoutes><Horario /></PrivateRoutes>} />
        <Route path="/" element={ <PrivateRoutes><Profesores /></PrivateRoutes>} />
         <Route path="/profesor/:id" element={<PrivateRoutes><Profesor /></PrivateRoutes>} />
        <Route path="/profesor/crear" element={<PrivateRoutes><CrearProfesor /></PrivateRoutes>} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
