import { createContext,useEffect,useReducer } from "react";

const INITIAL_STATE = {
    currentUser :JSON.parse(localStorage.getItem("user")) || null,
}

const AuthReducer = (state,action) =>{



    switch (action.type) {
        case "LOGIN":
            
            return{
                currentUser:action.payload
            }

        case "LOGOUT":

            return{
                currentUser:null
            }
    
        default:
            return state
    }

}


export const AdminAuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const[state,dispatch] = useReducer(AuthReducer,INITIAL_STATE)

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.currentUser))
    },[state.currentUser])

    return(
        <AdminAuthContext.Provider value={{currentUser:state.currentUser,dispatch}}>
            {children}
        </AdminAuthContext.Provider>
    )
}