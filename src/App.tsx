import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import { AuthProvider } from './context/AuthContext.tsx';
import ProtectedRoute from './context/ProtectedRoute';

// Import your components
import Horario from './components/Horario.tsx';
import Profesores from './views/profesores/Profesores.tsx';
import CrearProfesor from './views/profesores/CrearProfesor.tsx';
import Login from './views/Login.tsx';
import Error from './views/Error.tsx';
import Materias from './views/materias/Materias.tsx';
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
import CrearClase from './views/CrearClase.tsx';
import Unauthorized from './views/Unauthorized.tsx'; // Make sure to create this component
import Register from './views/Register.tsx';

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            // Simulate data loading
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLoading(false);
        };

        loadData();
    }, []);

    if (loading) {
        return <div className='flex flex-col items-center justify-center h-screen'><Triangle /> <p>Checking credentials...</p></div>
    }

    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> 
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/" element={
                    <ProtectedRoute allowedRoles={['admin', 'teacher', 'student']}>
                        <Profesores />
                    </ProtectedRoute>
                    } />
                <Route path="/profesor/crear" element={<ProtectedRoute allowedRoles={['admin']}><CrearProfesor /></ProtectedRoute>} />
                <Route path="/profesor/editar/:id" element={<ProtectedRoute allowedRoles={['admin']}><EditarProfesor /></ProtectedRoute>} />
                <Route path="/materias" element={<ProtectedRoute allowedRoles={['admin', 'teacher', 'student']}><VerMaterias /></ProtectedRoute>} />
                <Route path="/materias/crear" element={<ProtectedRoute allowedRoles={['admin']}><CrearMateria /></ProtectedRoute>} />
                <Route path="/profesormateria" element={<ProtectedRoute allowedRoles={['admin', 'teacher']}><VisualizarProfesorMateria /></ProtectedRoute>} />
                <Route path="/profesormateria/crear" element={<ProtectedRoute allowedRoles={['admin']}><CrearProfesorMateria /></ProtectedRoute>} />
                <Route path="/salones" element={<ProtectedRoute allowedRoles={['admin', 'teacher', 'student']}><VerSalones /></ProtectedRoute>} />
                <Route path="/salones/crear" element={<ProtectedRoute allowedRoles={['admin']}><CrearSalon /></ProtectedRoute>} />
                <Route path="/vistahorariosdisponibles" element={<ProtectedRoute allowedRoles={['admin', 'teacher']}><VerHorariosDisponibles /></ProtectedRoute>} />
                <Route path="/horarioDisponibles/crear" element={<ProtectedRoute allowedRoles={['admin', 'teacher']}><CrearHorarioDisponible /></ProtectedRoute>} />
                <Route path="/clases" element={<ProtectedRoute allowedRoles={['admin', 'teacher', 'student']}><Clases /></ProtectedRoute>} />
                <Route path="/vistaClases" element={<ProtectedRoute allowedRoles={['admin', 'teacher', 'student']}><VisualizarClases /></ProtectedRoute>} />
                <Route path="/clase/editar/:id" element={<ProtectedRoute allowedRoles={['admin']}><EditarClase /></ProtectedRoute>} />
                <Route path="/perfil" element={<ProtectedRoute allowedRoles={['admin', 'teacher', 'student']}><Perfil /></ProtectedRoute>} />
                <Route path="/*" element={<ProtectedRoute><Error /></ProtectedRoute>} />
            </Routes>
        </AuthProvider>
    );
}

export default App;