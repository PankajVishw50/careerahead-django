import { useEffect } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

export default function Dashboard(){
    const {auth} = useOutletContext()
    const navigate = useNavigate()


    useEffect(() => {

        if (auth.data.is_counsellor){
            return navigate('/counsellor/dashboard', {
                replace: true,
            });
        }else{
            return navigate('/user/dashboard', {
                replace: true,
            })
        }

    })


    return (
        <></>
    )


}   