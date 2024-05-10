import { createContext, useEffect, useState } from 'react'
import { loginWithCredentials, FirebaseAuth } from '../firebase/providers'
import { onAuthStateChanged } from 'firebase/auth'; 



type StateDispatch = any

export const onAuthStateHasChanged = (setSession: StateDispatch) => {
    onAuthStateChanged(FirebaseAuth, user => {

        if (!user) return setSession({ status: 'no-authenticated', userId: null })

        setSession({ status: 'authenticated', userId: user!.uid })
    })
}
export const logoutFirebase = async () => await FirebaseAuth.signOut()

export interface AuthStateContext {
    userId: string | null
    status: 'checking' | 'authenticated' | 'no-authenticated'
    handleLoginWithCredentials: (password: string, email: string) => Promise<void>
    handleRegisterWithCredentials: (password: string, email: string) => Promise<void>
    handleLogOut: () => Promise<void>
}



const initialState: Pick<AuthStateContext, 'status' | 'userId'> = {
    userId: null,
    status: 'checking'
}



export const AuthContext = createContext({} as AuthStateContext)

interface IElement { children: JSX.Element | JSX.Element[] }

export const AuthProvider = ({ children }: IElement) => {

    const [session, setSession] = useState(initialState)

    useEffect(() => {
        onAuthStateHasChanged(setSession)
    }, [])

    const handleLogOut = async () => {
        logoutFirebase()
        setSession({ userId: null, status: 'no-authenticated' })
    }

    const validateAuth = (userId: string | undefined) => {
        if (userId) return setSession({ userId, status: 'authenticated' })
        handleLogOut()
    }

    const checking = () => setSession(prev => ({ ...prev, status: 'checking' }))

   

    const handleLoginWithCredentials = async (email: string, password: string) => {
        checking()
        const userId = await loginWithCredentials( email, password )
        validateAuth(userId)
    }

    const handleRegisterWithCredentials = async (password: string, email: string) => {
        checking()
        //const userId = await signInWithCredentials({ email, password })
        //validateAuth(userId)
    }

    return (
        <AuthContext.Provider
            value={{
                ...session,
                handleLoginWithCredentials,
                handleRegisterWithCredentials,
                handleLogOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
