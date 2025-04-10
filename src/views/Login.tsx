import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const rol = await login(email, password);
      if (typeof rol === "string" && rol === 'admin') {
      navigate("/");
      }else{
      navigate("/profesor/perfil/1");

      }
      
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen" style={{
      backgroundImage: "url('https://img2.wallspic.com/crops/2/5/2/0/30252/30252-negocio-taza_de_cafe-tabla-medios_de_comunicacion_social-empresa-3840x2160.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      {loading && (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-50 bg-opacity-60 absolute">
          <Triangle />
          <p>Checking credentials...</p>
        </div>
      )}
      <div className="flex w-11/12 max-w-4xl shadow-2xl rounded-lg overflow-hidden bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col w-1/2 p-10 space-y-6">
          <h2 className="text-3xl font-bold text-gray-700">Iniciar Sesión</h2>
          <input
            className="p-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="p-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-lime-600 text-white rounded-lg hover:bg-blue-400 transition duration-300"
            disabled={loading}
          >
            iniciar
          </button>
        
        </form>
        <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-200">
          <img
            src="https://www.uts.edu.co/sitio/wp-content/uploads/2020/08/IMG-20200815-WA0004.jpg"
            alt="Login image"
            className="object-cover h-full"
          />
        </div>
      </div>
      <footer className="absolute bottom-0 w-full text-center p-4 bg-white">
        <p className="text-gray-500">© 2024 Gestion de horarios, proyecto de grado.</p>
      </footer>
    </div>
  );
}