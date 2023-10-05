import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Button, Select, MenuItem, TextField } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import PasswordSuggester from './passwordSuggester';


const FormContainer = styled('div')({
  width: '50%',
  textAlign: 'center',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  borderRadius: '5px',
  padding: '2rem',
});



const RegisterPoliceComponent = () => {

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [id, setId] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [suggestedPassword, setSuggestedPassword] = useState('');

  const [formData, setFormData] = useState({
    roll: '',
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone_no: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your validation logic here before submitting
    setId(formData.name[0]+formData.name[1]+formData.name[2]+(Math.floor(Math.random() * 10000) + 1))

    if (
      !formData.name ||
      // !validateEmail(formData.email) ||
      !formData.password ||
      !formData.confirm_password ||
      formData.password !== formData.confirm_password
      // !validatePhoneNumber(formData.phone_no) ||
    ) {
      alert('Please fill in all required fields and correct validation errors.');
      return;
    }
    // Your submit logic here
    try {
      axios.post('http://localhost:3001/post-application', {
        id,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
        phone_no: formData.phone_no
      })
        .then(() => {
          alert("Account created and successfully!");
          window.location.reload();
        })
        .catch((error)=>{
          console.log(error);
          
          
        })

        axios.post('http://localhost:3001/mail-application',{
          email:formData.email,
          password:formData.password
        })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-white p-5 border-shadow shadow-lg'>
      <div>
        <h3>Police-Officer Registration</h3>
        <form onSubmit={handleSubmit}>

          {/* Name */}
          <FormControl fullWidth>
            <InputLabel>Name</InputLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </FormControl>

       
          {/* Email */}
          <FormControl fullWidth>
            <InputLabel>Email</InputLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          {/* Phone No */}
          <FormControl fullWidth>
            <InputLabel>Phone No</InputLabel>
            <Input
              name="phone_no"
              value={formData.phone_no}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <div className='text-end'>
            <PasswordSuggester
              setPassword={setSuggestedPassword} // Pass a callback function to set the suggested password
            />
          </div>
          
          {/* Password */}
          <FormControl fullWidth>
            <InputLabel>Password</InputLabel>
            <Input
              type={hidePassword ? 'password' : 'text'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </FormControl>

        
          {/* Confirm Password */}
          <FormControl fullWidth>
            <InputLabel>Confirm Password</InputLabel>
            <Input
              type={hideConfirmPassword ? 'password' : 'text'}
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          {/* Password visibility toggles */}
          <Button
            onClick={() => setHidePassword(!hidePassword)}
            style={{ marginTop: '1rem' }}
          >
            {hidePassword ? 'Show Password' : 'Hide Password'}
          </Button>
          <Button
            onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
            style={{ marginTop: '1rem' }}
          >
            {hideConfirmPassword ? 'Show Confirm Password' : 'Hide Confirm Password'}
          </Button>
          <div className=''>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: '1rem' }}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPoliceComponent;
