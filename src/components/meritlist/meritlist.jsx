import React, { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

const MeritList = () => {
    const [products, setProducts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [rowData, setRowData] = useState({});
    const [inspector, setInspector] = useState();
    const [area, setArea] = useState();

    const generateRandomPassword = (length) => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";

        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset.charAt(randomIndex);
        }

        return password;
    };

    var password;

    const handleGeneratePassword = () => {
        const newPassword = generateRandomPassword(16);
        password = newPassword;
    };

    const fetchData = () => {
        axios.get('http://localhost:3001/get-application')
            .then((res) => {
                setProducts(res.data);
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
            size: 150,
        },
        {
            accessorKey: 'roll',
            header: 'ID',
            size: 100,
        },
        {
            accessorKey: 'age',
            header: 'Age',
            size: 100,
        },
        {
            accessorKey: 'gender',
            header: 'Gender',
            size: 100,
        },
        {
            accessorKey: 'contact',
            header: 'Contact',
            size: 150,
        },
        {
            accessorKey: 'email',
            header: 'Email',
            size: 300,
        },
    ];

    const handleButtonClick = (row) => {
        setOpenDialog(true);
        setRowData(row.original);
    };

    const postAccount = (data) => {
        handleGeneratePassword();

        try {
            axios.post('http://localhost:3001/post-inspector', {    //Posting the inspector
                id: data.roll,
                name: data.name,
                email: data.email,
                contact: data.contact,
                age: data.age,
                gender: data.gender,
                stationDetails: data.stationDetails,
                applicationDate: data.applicationDate,
                area: data.area,
                category: data.category,
                password
            })
                .then(() => {
                    axios.post('http://localhost:3001/post-main-model', {  //Posting into main for login
                        name: data.name,
                        email: data.email,
                        contact: data.contact,
                        category: data.category,
                        password
                    })
                        .catch((error) => {
                            alert("Problem with creating account in main");
                            console.log(error)
                        })

                })
                .then(() => {
            axios.get(`http://localhost:3001/get-zones-code/${data.stationDetails}`)    //get station details to transfer the existing inspector
                .then((response) => {
                    axios.put(`http://localhost:3001/transfer-inspector/${data.stationDetails}`, {  //transfer existing officer
                        stationCode: data.stationDetails,
                        inspector:data.name,
                        area:response.data.area,
                        email:data.email
                    })
                    .then(()=>{
                        alert("Success")
                    })
                        .catch((error) => {
                            console.log(error);
                        })
                })

                    
                })
                .then(() => {
                    axios.delete(`http://localhost:3001/delete-application/${data._id}`)        //Deleting the officer from application list
                        .catch((error) => {
                            console.log(error)
                        })
                    axios.post('http://localhost:3001/send-email-credentials', {        //sending email
                        email: data.email,
                        password
                    })
                        .then(() => {
                            alert("Successfully added and email sent");

                        })
                        .catch(() => {
                            alert("Problem in sending email!")
                        })
                })
                .catch((error) => {
                    alert('Could not add account');
                })
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteAccount = (data) => {

        try {
            console.log(data.applicationDate)


            axios.delete(`http://localhost:3001/delete-application/${data._id}`)
                .catch((error) => {
                    console.log(error)
                })

        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="card mt-5">
                <MaterialReactTable
                    columns={columns}
                    data={products}
                    editingMode="modal"
                    enableColumnOrdering
                    enableEditing
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <Tooltip arrow placement="right" title="View">
                                <IconButton color='primary' onClick={() => handleButtonClick(row)}>
                                    <FontAwesomeIcon icon={faExpand} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                />
            </div>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="modal-title"
            >
                <DialogTitle id="modal-title">Officer Details</DialogTitle>
                <DialogContent>
                    {rowData && (
                        <ul className='list-unstyled p-2'>
                            <li>Name: {rowData.name}</li>
                            <li>Roll: {rowData.roll}</li>
                            <li>Email: {rowData.email}</li>
                            <li>Contact: {rowData.contact}</li>
                            <li>Age: {rowData.age}</li>
                            <li>Gender: {rowData.gender}</li>
                            <li>Station Details: {rowData.stationDetails}</li>
                            <li>Application Date: {rowData.applicationDate}</li>
                            <li>Area: {rowData.area}</li>
                            <li>Category:{rowData.category}</li>
                        </ul>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => postAccount(rowData)}>Add Account</Button>
                    <Button onClick={() => setOpenDialog(false)}>Decline</Button>
                    <Button onClick={() => setOpenDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MeritList;
