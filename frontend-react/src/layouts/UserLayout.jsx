import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import Auth from '../utils/Auth'
import Location from '../utils/Location'

function UserLayout(props) {
    const {auth, modal} = useOutletContext() 
    const navigate = useNavigate()
    const location = useLocation()

    
    useEffect(() => {
        if (auth && auth.setted_up){
            if (!auth.is_authenticated()){
                return navigate(`/login?next=${location.pathname}`, {replace: true})
            }else{

                if (!auth.data.email_meta || !auth.data.email_meta.verified){
                    modal.toast(
                        'Verify your email to continue',
                        'info'
                    )
                    Location.not_navigate_if_same(navigate, '/email/verification');
                    return 
                }
                else if (!auth.data.is_setup){
                    modal.toast(
                        'Setup your profile to continue',
                        'info'
                    )
                    return navigate('/setup')
                }
            }
        }
    

    }, [auth]);


    
    return (
        auth && auth.is_authenticated() ?
        <Outlet
        context={{
            auth,
            modal
        }}
        /> :
        <></>
    )
  
}

export default UserLayout