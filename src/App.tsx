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
  element: ReactNode;
  path: string;
  // Puedes agregar otras propiedades aquí si es necesario
}

function PrivateRoute({ element, ...props }: PrivateRouteProps) {
  const { status } = useContext(AuthContext);

  return (
    <Route
      {...props}
      element={status === 'authenticated' ? element : <Navigate to="/login" />}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <PrivateRoute path="/horario" element={<Horario />} />
        <PrivateRoute path="/" element={<Profesores />} />
        <PrivateRoute path="/profesor/:id" element={<Profesor />} />
        <PrivateRoute path="/profesor/crear" element={<CrearProfesor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
