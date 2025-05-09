import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const Appcontext=createContext()

const AppContextProvider=(props)=>{
    
    const [credit,Setcredit]=useState(false)

    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const {getToken}=useAuth()

    const loadCreditData=async()=>{
        try {
            
            const token=await getToken()
            const {data}=await axios.get(backendUrl+'/api/user/credits',{headers:{token}})
            if(data.success){
                Setcredit(data.credits)
                console.log(data.credits)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        loadCreditData()
    }, [])

    const value={
        credit,
        Setcredit,
        loadCreditData,
        backendUrl
    }

    return(
        <Appcontext.Provider value={value}>
        
            {props.children}
        
        </Appcontext.Provider>
    )
}
export default AppContextProvider
