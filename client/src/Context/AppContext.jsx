import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import {useUser, useAuth} from "@clerk/clerk-react"
import { toast } from "react-hot-toast"

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

const AppContext = createContext()

export const AppProvider = ({children})=>{

    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate()
    const {user}= useUser()
    const {getToken} = useAuth()
    const [isOwner , setisOwner] = useState(false)
    const [showhotelreg, setshowhotelreg] = useState(false)
    const [searccity, setserachcity] = useState()

const fetchuser = async ()=>{
    try {
       const data=  await axios.get('/api/user', {headers: {Authorization: `Bearer ${await getToken({})}`}})
        if(data.success){
            setisOwner(data.role === "hotelOwner")
             setserachcity(data.recentSearchCities)
        } else{
            setTimeout(()=>{
                fetchuser()
            },5000)
        }
    } catch (error) {
        toast.error(error.message)
    }

}

useEffect(()=>{
 if(user){
    fetchuser()
 }
},[user])

    const value = {
           currency,
           navigate,
           user,
           getToken,
           isOwner,setisOwner,
           showhotelreg,setshowhotelreg,
           axios,
           searccity,
           setserachcity
    }
  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = ()=> useContext(AppContext)