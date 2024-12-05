import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import { AuthProvider } from './context/AuthContext.tsx';
import ProtectedRoute from './context/ProtectedRoute';


//predeterminados
import Login from './views/Login.tsx';
import Error from './views/Error.tsx';
import Perfil from './views/profesores/verProfesor.tsx';
import Unauthorized from './views/Unauthorized.tsx'; // Make sure to create this component
import Register from './views/Register.tsx';

//profesores
import Profesores from './views/profesores/listaProfesores.tsx';
import CrearProfesor from './views/profesores/CrearProfesor.tsx';

//clases
import VisualizarClases from './views/clases/listaClases.tsx';
import Clases from './views/clases/crearClases.tsx';

//materias que el profesor dicta
import VisualizarProfesorMateria from './views/profesor_materia/listaProfesorMateria.tsx';
import CrearProfesorMateria from './views/profesor_materia/crearProfesorMateria.tsx';

//horios disponibles del profesor
import CrearHorarioDisponible from './views/horarios_disponibles/horariosDisponibles.tsx';
import VerHorariosDisponibles from './views/horarios_disponibles/listaHorariosDisponible.tsx';

//materias
import VerMaterias from './views/materias/listaMaterias.tsx';
import CrearMateria from './views/materias/crearMaterias.tsx';

//Salones
import CrearSalon from './views/salones/crearSalones.tsx';
import VerSalones from './views/salones/vistaSalones.tsx';


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
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* profesores */}
                <Route path="/register" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <Register />
                    </ProtectedRoute>} />

                <Route path="/" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <Profesores />
                    </ProtectedRoute>} />

                <Route path="/profesor/crear" element={<ProtectedRoute allowedRoles={['admin']}>
                    <CrearProfesor />
                    </ProtectedRoute>} />

                    <Route path="/profesor/editar/:id" element={<ProtectedRoute allowedRoles={['admin','profesor']}>
                    <CrearProfesor />
                    </ProtectedRoute>} />

                <Route path="/profesor/perfil/:id" element={<ProtectedRoute allowedRoles={['admin', 'profesor']}>
                    <Perfil />
                </ProtectedRoute>} />
            

                {/* materia */}
                <Route path="/materias" element={<ProtectedRoute allowedRoles={['admin']}>
                    <VerMaterias />
                </ProtectedRoute>} />

                <Route path="/materias/crear" element={<ProtectedRoute allowedRoles={['admin']}>
                    <CrearMateria />
                </ProtectedRoute>} />
                <Route path="/materias/editar/:id" element={<ProtectedRoute allowedRoles={['admin']}>
                    <CrearMateria />
                </ProtectedRoute>} />


                {/* Profesor materia */}

                <Route path="/profesormateria" element={<ProtectedRoute allowedRoles={['admin']}>
                    <VisualizarProfesorMateria />
                </ProtectedRoute>} />

                <Route path="/profesormateria/crear" element={
                <ProtectedRoute allowedRoles={['admin','profesor']}>
                    <CrearProfesorMateria />
                </ProtectedRoute>} />
                <Route path="/profesormateria/editar/:id" element={
                <ProtectedRoute allowedRoles={['admin','profesor']}>
                    <CrearProfesorMateria />
                </ProtectedRoute>} />

                    
                {/* salones */}
                <Route path="/salones" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <VerSalones />
                </ProtectedRoute>} />

                <Route path="/salones/crear" element={<ProtectedRoute allowedRoles={['admin']}>
                    <CrearSalon />
                </ProtectedRoute>} />

                <Route path="/salones/editar/:id" element={<ProtectedRoute allowedRoles={['admin']}>
                    <CrearSalon />
                </ProtectedRoute>} />



                
                <Route path="/vistahorariosdisponibles" element={<ProtectedRoute allowedRoles={['admin']}>
                        <VerHorariosDisponibles />
                </ProtectedRoute>} />
    
                <Route path="/horarios-disponibles/crear" element={<ProtectedRoute allowedRoles={['admin']}>
                    <CrearHorarioDisponible />
                </ProtectedRoute>} />

                <Route path="/horarios-disponibles/editar/:id" element={<ProtectedRoute allowedRoles={['admin']}>
                    <CrearHorarioDisponible />
                </ProtectedRoute>} />


                <Route path="/clases" element={<ProtectedRoute allowedRoles={['admin']}>
                    <Clases />
                </ProtectedRoute>} />

                <Route path="/editar-clase/:id" element={<ProtectedRoute allowedRoles={['admin']}>
                    <Clases />
                </ProtectedRoute>} />

                <Route path="/vistaClases" element={<ProtectedRoute allowedRoles={['admin']}>
                    <VisualizarClases />
                </ProtectedRoute>} />



                <Route path="/*" element={<ProtectedRoute>
                    <Error />
                </ProtectedRoute>} />
            </Routes>
        </AuthProvider>
    );
}

export default App;