import React, { useState } from 'react';
import axios from 'axios';
import '../styles/register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCpassword] = useState('');
    const [contact, setcontact] = useState('');
    const [image, setImage] = useState('');
    const [age,setAge] = useState();
    const history = useNavigate();

    const emailRegEx = /^[A-Za-z0-9.]+@gmail.com$/;
    const passRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    const contactRegEx = /^[6-9]{1}[0-9]{9}$/;

    const registerValidate = (e) => {
        e.preventDefault();

        if (name === '') {
            alert('Please enter the name');
        } else if (email === '') {
            alert('Please enter the email id');
        } else if (password === '') {
            alert('Please enter the password');
        } else if (cPassword === '') {
            alert('Please enter the confirm password');
        } else if (contact === '') {
            alert('Please enter the contact number');
        } else if (!emailRegEx.test(email)) {
            alert('Please enter a valid email id');
        } else if (!passRegEx.test(password)) {
            alert('The password should contain at least one uppercase, one lowercase, one number, and one special character, and the minimum length of the password is 8.');
        } else if (!contactRegEx.test(contact)) {
            alert('Please enter a valid contact number');
        } else if (password !== cPassword) {
            alert('Password and the confirm password do not match');
        } else {
            axios
                .post('http://localhost:3001/post-civilian', { name, age,email,contact, password, image })
                .then((result) => {
                    console.log(result);
                    alert('Account created successfully');
                    history('/login')
                })
                .catch((error) => {
                    console.log(error.response.data.error);
                    if (error.response.data.error === 'Duplicate Email') {
                        alert('This email already exists');
                    }
                });
        }
    };

    const convertToBase64 = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result);
        };
        reader.onerror = (error) => {
            console.log('error ', error);
        };
    };

    return (
        <div className="mt-5 col-6 mx-auto ">
            <div className="wrapper row  mt-5 register-form">
                <h2>Registration</h2>
                <form onSubmit={registerValidate}>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="number"
                            placeholder="Enter your age"
                            required
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
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
                            type="tel"
                            placeholder="Enter your contact number"
                            required
                            value={contact}
                            onChange={(e) => setcontact(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Create password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Confirm password"
                            required
                            value={cPassword}
                            onChange={(e) => setCpassword(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                    <input
                        accept="image/*"
                        type="file"
                        placeholder="Upload Image"
                        onChange={convertToBase64}
                    />
                </div>
                   
                    <div className="input-box button">
                        <input type="Submit" value="Register Now" />
                    </div>
                </form>
               <p>Already have an account? <Link to='/login'>Login!</Link></p>
            </div>
        </div>
    );
};

export default Register;
