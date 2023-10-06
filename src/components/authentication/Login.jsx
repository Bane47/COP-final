// Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUserEmail } from "../ReduxTools/counterSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Added state for showing password
  const history = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle showPassword state
  };

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
            alert('Logged in successfully!');
            localStorage.setItem('loggedUser', email);
            localStorage.setItem('contact', result.data.user.contact);
            localStorage.setItem('userName', result.data.user.name);
            localStorage.setItem('role', result.data.user.role);         
            // Dispatch action to update Redux store
            dispatch(setUserEmail(result.data.user));
            history('/dashboard');
            window.location.reload();
          })
          .catch((error) => {
            console.log(error.response.data.error);
            if (error.response.data.error === 'User not found') {
              alert('User not found');
            }
          });
      } catch (error) {
        console.log('Error in logging ', error);
      }
    }
  };

  return (
    <div>
      <div className="justify-content-center ">
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
                type={showPassword ? "text" : "password"} // Toggle input type
                placeholder="Enter the password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />


            </div>
            <div className='row'>
              <div className='col-6'>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="show-password-button bg-transparent border-0"
                >
                  {showPassword ? (
                    <>
                      <FontAwesomeIcon icon={faEyeSlash} /> Hide Password
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faEye} /> Show Password
                    </>
                  )}
                </button>
              </div>
              <div className='col-6'>
                <p className="text-center">
                  <Link to="/forgetpassword" className="text-decoration-none">
                    {' '}
                    Forget Password ?
                  </Link>{' '}
                </p>
              </div>
            </div>
            <div className="input-box button">
              <input type="Submit" value="Login" />
            </div>
          </form>
          <p>
            Don't have an account ?{' '}
            <Link to="/register" className="text-decoration-none">
              {' '}
              Signup!
            </Link>{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
