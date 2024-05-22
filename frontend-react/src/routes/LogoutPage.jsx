import { useEffect } from "react"
import { useOutletContext, Navigate, useNavigate } from "react-router-dom"

export default function LogoutPage(){
    const {auth} = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (auth && auth.is_authenticated()){
            auth.logout()
        }
        return navigate('/welcome')
    })
    return <></>
}   