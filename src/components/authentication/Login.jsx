import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    // const [routeCategory, setRouteCategory] = useState('login-civilian')

    const history = useNavigate();

    const loginValidate = (e) => {
        e.preventDefault();

        if (email === '') {
            alert('Please enter the email id');
        } else if (password === '') {
            alert('Please enter the password');
        } else {

            try {
                
                axios
                    .post(`http://localhost:3001/login`, { email, password })
                    .then((result) => {
                        console.log(result.data.user);
                        
                        alert('Logged in successfully!');
                        localStorage.setItem('loggedUser', email);
                        localStorage.setItem('contact',result.data.user.contact)
                        localStorage.setItem('userName',result.data.user.name)
                        localStorage.setItem('role', result.data.user.role);
                        history('/dashboard')
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.log(error.response.data.error);
                        if(error.response.data.error==='User not found'){
                            alert("User not found")
                        }
                    });
            } catch (error) {
                console.log("Error in loggin ", error)
            }
        }
    };


    return (
        <div className='mt-5'>
            <div className="justify-content-center mt-5">
                <div className="wrapper row col-6 mx-auto">
                    <h2>Login</h2>
                    <form onSubmit={loginValidate}>

                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                       
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Enter the password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            
                        </div>
                                       
                        <p className='text-center'><Link to='/forgetpassword' className='text-decoration-none'> Forget Password ?</Link> </p>

                        <div className="input-box button">
                            <input type="Submit" value="Login" />
                        </div>
                    </form>
                    <p>Don't have an account ?<Link to='/register' className='text-decoration-none'> Signup!</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default Login