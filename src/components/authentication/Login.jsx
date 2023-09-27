import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true); // New state for "Remember me" checkbox
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
                    .post('http://localhost:3001/login-civilian', { email, password, rememberMe })
                    .then((result) => {
                        console.log(result);
                        alert('Logged in successfully!');
                        localStorage.setItem('loggedUser', email);
                        history('/')
                    })
                    .catch((error) => {
                        console.log(error.response.data.error);
                    });
            } catch (error) {
                console.log("Error in loggin ", error)
            }
        }
    };


    return (
        <div>
            <div className="justify-content-center">
                <div className="wrapper row col-12">
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
                        <div className="policy">
                            <input type="checkbox" checked={rememberMe}
                                onChange={(e) => {
                                    setRememberMe(e.target.checked);
                                }} />
                            <h3>Remember me</h3>
                           
                        </div>

                        <div className="input-box button">
                            <input type="Submit" value="Login" />
                        </div>
                    </form>
                    <p>Don't have an account ?<Link to='/register'> Signup!</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default Login