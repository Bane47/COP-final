import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Form, ToastContainer } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [newPassword,setNewPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();
    const {id,token}= useParams();
    const navigate = useNavigate()

    const handleResetPassword=(e)=>{
        if(newPassword===confirmPassword){
            
            axios.post(`http://localhost:3001/password-reset/${id}/${token}`,{
                password:newPassword
            }).then((res)=>{
                if(res.data.status==="Success"){
                    navigate('/login')
                }else{
                    console.log(res.data.status)
                }
            })

        }else{
            toast.error("Password do not match")
        }
    }

  return (
    <div className=' d-flex justify-content-center mt-5 p-5'>
      <ToastContainer  />
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Reset Password</Card.Title>
          <Card.Text>
            <Form.Control type="password" placeholder="Enter the new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='my-3' />

            <Form.Control type="password" placeholder="Confirm the password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          </Card.Text>
          <Button variant="primary" type='button' className='mt-4' onClick={handleResetPassword}>Send</Button>{' '}
        </Card.Body>
      </Card>
    </div>
  )
}

export default ResetPassword;