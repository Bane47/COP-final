import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState();

  const handleEmailSent=()=>{
  
    axios.post('http://localhost:3001/forgotPassword',{
      email
    })
    .then((response)=>{
      console.log(response)
      toast.success("Email sent to your mail ID!")
    }).catch((error)=>{
      console.log(error);
      toast.error("User not found!")
    })
  }


  return (
    <div className=' d-flex justify-content-center mt-5 p-5'>
      <ToastContainer  />
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Please enter your email ID</Card.Title>
          <Card.Text>
            <Form.Control type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Card.Text>
          <Button variant="primary" type='button' className='mt-4' onClick={()=>handleEmailSent()}>Send</Button>{' '}
        </Card.Body>
      </Card>
    </div>
  )
}

export default ForgotPassword;