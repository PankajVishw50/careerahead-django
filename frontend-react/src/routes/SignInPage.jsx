import '../assets/css/Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'


export default function SignInPage() {

    const [formData, setFormData] = useState({
        email: null,
        username: null,
        gender: null,
        password: null,
        confirm_password: null,
    })

    function handle_change(e){
        const {target} = e;
        
        setFormData(prevData => {
            return {
                ...prevData,
                [target.getAttribute('name')]: target.value,
            }
        })
        console.log(formData);
    }

    function submit_form(e){
        e.preventDefault();

        console.log(formData)
        if (formData.password !== formData.confirm_password){
            alert('password and confirm password should be same')
            return;
        }

        return alert('would contact server');
    }

    return(

        <div className="login">
                <div className="form">
                    <h2>Create Account</h2>

                    <form 
                    method="POST"
                    onSubmit={submit_form}
                    >

                        <input 
                        className="email data-field" 
                        id="email" 
                        name="email" 
                        placeholder="example@gmail.com" 
                        required
                        type="email" 
                        onChange={handle_change}
                        defaultValue={formData.email}
                        />

                        <input 
                        className="username data-field" 
                        id="username" maxLength="20"
                        minLength="2" 
                        name="username" 
                        placeholder="Enter an username.." 
                        required 
                        type="text" 
                        onChange={handle_change}
                        defaultValue={formData.username}
                        />

                        <select 
                        className="gender" 
                        id="gender" 
                        name="gender" 
                        required
                        onChange={handle_change}
                        defaultValue={formData.gender}
                        disabled
                        >
                            <option value="-1">Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>


                        <input 
                        className="password data-field" 
                        id="password" 
                        name="password" 
                        placeholder="Enter an password" 
                        required 
                        type="password" 
                        onChange={handle_change}
                        defaultValue={formData.password}
                        />

                        <input 
                        className="confirm-password data-field" 
                        id="confirm_password" 
                        name="confirm_password" 
                        placeholder="Confirm Password" 
                        required
                        type="password"
                        onChange={handle_change}
                        defaultValue={formData.confirm_password}
                        />

                        <div className="remember">
                            <input id="remember"
                            name="remember"
                            type="checkbox"
                            value="y"
                            disabled
                            /> 
                            <label htmlFor="remember">remember me</label>
                        </div>

                        <input 
                        className="login-btn btn1" 
                        id="submit" 
                        name="submit" 
                        type="submit" 
                        value="Create Account"/>

                    </form>

                    <p><Link to='/login' >Already an user? Login.. </Link></p>

                </div>
        </div>


    )

}