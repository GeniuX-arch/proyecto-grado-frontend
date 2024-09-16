
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import Buttonxd from "./button";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [carga, setCarga] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = () => {
    const user={
      password:password,
      email:email
    }

    login(user);
    navigate("/");
  }
  console.log('User in localStorage:', localStorage.getItem('user'));

  

  
  /*
  const signInWithCredentials = async (email: string, password: string) => {
    try {
      const resp = await  signInWithEmailAndPassword(auth, email, password);
      return resp.user.uid;
    } catch (error) {
      alert((error as Error).message);
    }
  };
  */


// type StateDispatch = React.Dispatch<React.SetStateAction<Pick<AuthStateContext, "status" | "userId">>>
/*
type StateDispatch = any

*/

/*
 const onAuthStateHasChanged = (setSession: StateDispatch) => {
    onAuthStateChanged(FirebaseAuth, user => {

        if (!user) return setSession({ status: 'no-authenticated', userId: null })

        setSession({ status: 'authenticated', userId: user!.uid })
    })
}
*/



  return (
    <div
      className="flex items-center justify-center w-screen h-screen"
      style={{
        backgroundImage: "url('https://img2.wallspic.com/crops/2/5/2/0/30252/30252-negocio-taza_de_cafe-tabla-medios_de_comunicacion_social-empresa-3840x2160.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {carga && (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-50 bg-opacity-60 absolute">
          <Triangle />
          <p>Revisando credenciales...</p>
        </div>
      )}
      <div className="flex w-11/12 max-w-4xl shadow-2xl rounded-lg overflow-hidden bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-1/2 p-10 space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-700">Iniciar Sesión</h2>
          <input
            className="p-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
          />
          {password.length < 6 && password.length !== 0 && (
            <p className="text-red-500">
              La contraseña debe tener al menos 6 caracteres
            </p>
          )}
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={handleRegister}
            className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Registrarse
          </button>
        </form>
        <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-200">
          <img
            src="https://www.uts.edu.co/sitio/wp-content/uploads/2020/08/IMG-20200815-WA0004.jpg"
            alt="Descripción de la imagen"
            className="object-cover h-full"
          />
        </div>
      </div>
      <footer className="absolute bottom-0 w-full text-center p-4 bg-white">
        <p className="text-gray-500">© 2024 Proyecto de grado.</p>
        
      </footer>

      
    </div>
  );
}
