import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { FirebaseError } from "firebase/app";
import { Triangle } from "react-loader-spinner";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [carga, setCarga] = useState(false);
  const { handleRegisterWithCredentials } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setCarga(true);
    try {
      await handleRegisterWithCredentials(email, password);
      setCarga(false);
      
    } catch (e) {
      let err = "";
      if (e instanceof FirebaseError) {
        err = "Error al crear la cuenta";
      } else {
        err = "Ocurrió un error";
      }
      setError(err);
      setCarga(false);
    }
  };
    
  return (
    <div
      className="flex items-center justify-center w-screen h-screen"
      style={{
        backgroundImage: "url('https://img1.wallspic.com/crops/8/3/6/8/3/138638/138638-luces_bokeh_rojas_y_blancas-3840x2160.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {carga && (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-50 bg-opacity-60 absolute">
          <Triangle />
          <p>Creando cuenta...</p>
        </div>
      )}
      <div className="flex w-11/12 max-w-4xl shadow-2xl rounded-lg overflow-hidden bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full p-10 space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-700">Registrarse</h2>
          <input
            className="p-4 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-4 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
          />
          <input
            className="p-4 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
          >
            Crear Cuenta
          </button>
        </form>
      </div>
      <footer className="absolute bottom-0 w-full text-center p-4 bg-white">
        <p className="text-gray-500">© 2024 Proyecto de grado.</p>
      </footer>
    </div>
  );
}
