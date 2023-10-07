import React, { useState } from 'react';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const ProgressUpdateForm = ({ onSubmit, email, name , firCode, compCode}) => {

    const officerName = localStorage.getItem('userName');
    const officerNumber = localStorage.getItem('contact')
    // Define state variables for form fields
    const [progress, setProgress] = useState('');
    const [status, setStatus] = useState('In Progress');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create an object with the form data
        const formData = {
            progress,
            status,
            officerName,
            name,
            firCode,
            compCode
        };

        // Pass the form data to the parent component's onSubmit function
        onSubmit(formData);
        // Clear the form fields
        setProgress('');
        setStatus('In Progress');


        axios.post('http://localhost:3001/progress-update', {
            email,
            progress,
            status,
            officerName,
            officerNumber,
            name,
            firCode,
            compCode
        })
         .then(() => {
                alert('Update sent!');
                window.location.reload();
            })
            .catch((error) => {
                console.log(error)
            })


    };

    return (
        <form onSubmit={handleSubmit} className='p-3'>
            <TextField
                label="Progress"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                required
                className='my-2'
            />
            <FormControl variant="outlined" >
                <InputLabel>Status</InputLabel>
                <Select
                    className='my-2'

                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Delayed">Delayed</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                </Select>
            </FormControl>

            <div>
                <Button type="submit" variant="contained" color="primary" className='my-2'>
                    Submit Progress
                </Button>
            </div>
        </form>
    );
};

export default ProgressUpdateForm;
