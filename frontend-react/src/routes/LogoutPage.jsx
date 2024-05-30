import { useEffect } from "react"
import { useOutletContext, Navigate, useNavigate } from "react-router-dom"

export default function LogoutPage(){
    const {auth, modal} = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (auth && auth.is_authenticated()){
            auth.logout()
            modal.toast(
                'User logged out!',
                'info'
            )
        }
        return navigate('/welcome')
    })
    return <></>
}   