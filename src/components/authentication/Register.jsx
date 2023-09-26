import React, { useState } from 'react';
import axios from 'axios';
import '../styles/register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCpassword] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');
    const [role, setRole] = useState('User');

    const emailRegEx = /^[A-Za-z0-9.]+@gmail.com$/;
    const passRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    const phoneRegEx = /^[6-9]{1}[0-9]{9}$/;

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
        } else if (phone === '') {
            alert('Please enter the phone number');
        } else if (!emailRegEx.test(email)) {
            alert('Please enter a valid email id');
        } else if (!passRegEx.test(password)) {
            alert('The password should contain at least one uppercase, one lowercase, one number, and one special character, and the minimum length of the password is 8.');
        } else if (!phoneRegEx.test(phone)) {
            alert('Please enter a valid phone number');
        } else if (password !== cPassword) {
            alert('Password and the confirm password do not match');
        } else {
            axios
                .post('http://localhost:3001/post-civilian', { name, email, password, phone, role, image })
                .then((result) => {
                    console.log(result);
                    alert('Account created successfully');
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
        <div className="justify-content-center">
            <div className="wrapper row col-12">
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                    <div className="policy">
                        <input type="checkbox" />
                        <h3>I accept all terms & condition</h3>
                    </div>
                    <div className="input-box button">
                        <input type="Submit" value="Register Now" />
                    </div>
                </form>
               
            </div>
        </div>
    );
};

export default Register;
