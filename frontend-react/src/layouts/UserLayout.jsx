import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import Auth from '../utils/Auth'

function UserLayout(props) {
    const {auth} = useOutletContext() 
    const navigate = useNavigate()
    const location = useLocation()

    console.log('from user layout: ', auth)
    console.log('user layout location: ', location);

    
    useEffect(() => {
        if (auth && auth.setted_up && !auth.is_authenticated()){
            return navigate(`/login?next=${location.pathname}`, {replace: true})
        }
    });

    if (!auth || auth.failed){
        return <></>
    }

    return <Outlet
    context={{
        auth
    }}
    />
  
}

export default UserLayout