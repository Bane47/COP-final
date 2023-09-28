import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true); // New state for "Remember me" checkbox
    const [userRole, setUserRole] = useState('civilian');
    // const [routeCategory, setRouteCategory] = useState('login-civilian')
    var routeCategory = 'login-civilian';
    const history = useNavigate();

    const loginValidate = (e) => {
        e.preventDefault();

        if (email === '') {
            alert('Please enter the email id');
        } else if (password === '') {
            alert('Please enter the password');
        } else {

            try {
                if (userRole === "officer") { routeCategory = 'login-police' }
                console.log(routeCategory)
                axios
                    .post(`http://localhost:3001/${routeCategory}`, { email, password, rememberMe })
                    .then((result) => {
                        console.log(result);
                        alert('Logged in successfully!');
                        localStorage.setItem('loggedUser', email);
                        localStorage.setItem('userName',result.data.user.name)
                        if (userRole === "officer") {
                            localStorage.setItem("role", userRole)
                        } else localStorage.setItem('role', userRole);
                        history('/dashboard')
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
                        {console.log(routeCategory)}
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Enter the password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="radio-group">
                            <label className='mx-2'>
                                <input
                                    type="radio"
                                    value="officer"
                                    checked={userRole === 'officer'}
                                    onChange={() => setUserRole('officer')}
                                /> Officer
                                 
                            </label> 
                            <label className='mx-2'>
                                <input
                                    type="radio"
                                    value=" civilian"
                                    checked={userRole === 'civilian'}
                                    onChange={() => setUserRole('civilian')}
                                /> Civilian
                                 
                            </label>
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
                    <p>Don't have an account ?<Link to='/register' className='text-decoration-none'> Signup!</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default Login