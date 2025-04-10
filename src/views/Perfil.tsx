
import { useAuth } from '../context/AuthContext';

export default function Perfil() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900">
      <div className="p-10 bg-gray-200 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Mr Loquito</h2>
        {user ? (
          <div>
            <p className="text-lg"><strong>Email:</strong> {user.email}</p>
            {/* amongussss */}
          </div>
        ) : (
          <p className="text-lg">No estás autenticado.</p>
        )}
      </div>
    </div>
  );
}
