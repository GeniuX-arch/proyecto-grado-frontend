import React, { useState,useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";








// Configurar Firebase


// Inicializar Firebase y obtener el servicio de autenticación
export default function Login() {
  const navegate= useNavigate()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  console.log(useContext(AuthContext))
  const {status, handleLoginWithCredentials}=useContext(AuthContext)
  if(status=='authenticated'){
  }
    

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
    e.preventDefault();
    try {
      await handleLoginWithCredentials(email, password);
      navegate('/')
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};
