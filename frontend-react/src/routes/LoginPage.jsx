import {  useOutletContext, useNavigate, useParams, useLocation } from "react-router-dom"
import { Link } from "react-router-dom";

import '../assets/css/Login.css'
import '../assets/css/button.css'
import { useState } from "react";

export default function LoginPage(){
    console.log('login page component execued');
    const {auth, modal} = useOutletContext()
    const navigate = useNavigate()
    const query_data = new URLSearchParams(useLocation().search)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    function handle_change({target}){

        setFormData(prevData => {
            return {
                ...prevData,
                [target.name]: target.value,
            }
        })

    }


    async function handle_submit(e){
        e.preventDefault();

        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        let json = {}
        try{
            json = await response.json()
        }catch{}

        if (response.status !== 200){
            return modal.toast(
                'Failed to log in',
                'error'
            )
        }

        auth.load_login(json)
        modal.toast(
            'successfully Logged in!',
            'success'
        );
        
        if (query_data.get('next') && query_data.get('server') == 1){
            return window.location.href = query_data.get('next')
        }

        return navigate(query_data.get('next') ?? '/dashboard');



    }

    
    return (

    <div className="login">
        <div className="form">
            <h2>Login</h2>
            <form method="POST" 
            onSubmit={handle_submit}
            >
                <input
                    className="email data-field"
                    id="email"
                    maxLength={60}
                    minLength={2}
                    name="email"
                    placeholder="example@email.com"
                    required=""
                    type="email"
                    defaultValue={formData.email}
                    onChange={handle_change}
                    />
                <input
                    className="password data-field"
                    id="password"
                    maxLength={60}
                    minLength={2}
                    name="password"
                    placeholder="password"
                    required=""
                    type="password"
                    defaultValue={formData.password}
                    onChange={handle_change}
                    />
                <div className="remember">
                    <input id="remember" name="remember" type="checkbox" defaultValue="y" />{" "}
                    <label htmlFor="remember">remember me</label>
                </div>
                <input
                    className="login-btn btn1"
                    id="submit"
                    name="submit"
                    type="submit"
                    defaultValue="Submit"
                    />
            </form>
            <p>
                <a href="/signin">New User? Create account.. </a>
            </p>
        </div>
    </div>    
    
    )



}