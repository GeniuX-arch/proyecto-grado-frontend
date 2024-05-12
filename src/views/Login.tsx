import React, { useState,useContext } from "react";
import { AuthContext } from "../context/authContext";
import { FirebaseError } from "firebase/app";
import { Triangle } from "react-loader-spinner";








// Configurar Firebase


// Inicializar Firebase y obtener el servicio de autenticación
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [carga, setCarga] = useState(false);
  console.log(useContext(AuthContext))
  const { handleLoginWithCredentials}=useContext(AuthContext)
    

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

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setCarga(true);

    let err= ""
    e.preventDefault();
    try {
      await handleLoginWithCredentials(email, password);
      
      console.log("hola")
    } catch (e) {
      if (e instanceof FirebaseError){

        err = "Error en el usuario o contraseña";
      }else{
        err = "Ocurrió un error";

      }
      
    setTimeout(() => {
      setCarga(false);
      setError(err);
    }, 2000);
      
    }
  };

  return (
     <div className="flex items-center justify-center w-screen h-screen">
       {carga && <div className='flex flex-col items-center justify-center h-screen w-screen bg-gray-50 bg-opacity-60 absolute'><Triangle /> <p>Revisando credenciales...</p> </div>}
      <form onSubmit={handleSubmit} className="m-20 flex flex-col w-5/12 text-center gap-3">
        <h2>Iniciar Sesión</h2>
        <input
          className="p-5 border h-10 focus:border-cyan-600  focus:outline-none "
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-5 border h-10 focus:border-cyan-600  focus:outline-none "
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
        />
        {password.length < 6 && password.length!=0 &&(
            <p className="text-red-500">La contraseña debe tener al menos 6 caracteres</p>
          )}
         {error && <p className="text-red-500 ">{error}</p>}
        <button type="submit" className="bg-blue-600 h-10 text-white">Iniciar Sesión</button>
      </form>
    </div>
  );
};
