import {  useOutletContext, useNavigate, useParams, useLocation } from "react-router-dom"

export default function LoginPage(){
    console.log('login page component execued');
    const {auth} = useOutletContext()
    const navigate = useNavigate()
    const query_data = new URLSearchParams(useLocation().search)
    

    const button_style = {
        margin: '10px',
        padding: '10px',
        background: 'black',
        color: 'white',
        maxWidth: '100px',
    }
    
    return (
        <button style={button_style}
        onClick={async () => {
            const response = await fetch('/auth/login', {
            
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'pankaj@gmail.com',
                    password: 'pankaj',
                })
            });

            let json = {}
            try{
                json = await response.json()
            }catch{}

            if (response.status !== 200){
                return alert('failed to log in');
            }

            auth.load_login(json)
            
            if (query_data.get('next') && query_data.get('server') == 1){
                return window.location.href = query_data.get('next')
            }

            return navigate(query_data.get('next') ?? '/welcome');
        }}
        >
            Log In
        </button>
    )


}