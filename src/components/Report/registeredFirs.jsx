import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { useCallback } from 'react';
import { MaterialReactTable } from 'material-react-table';
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
import { Delete, Edit } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faCircleCheck, faPenNib, faSearch } from '@fortawesome/free-solid-svg-icons';
import RowDetailsModal from '../model/TableModel';


const RegisteredFirs = () => {
    const [registrationTime, setRegistrationTime] = useState(null);
    const officer = localStorage.getItem('userName');
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowData, setRowData] = useState({});
    const [formData, setFormData] = useState();
    const [secondDialogOpen, setSecondDialogOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);




    const handleRowClick = (row) => {
        setSelectedRow(row);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedRow(null);
        setIsModalOpen(false);
    };


    const openDialog = (row) => {
        setDialogOpen(true);
        setRowData(row);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };
    const openSecondDialog = (row) => {
        setSecondDialogOpen(true);
        updateFetch(row)
    };

    const closeSecondDialog = () => {
        setSecondDialogOpen(false);
        setFormData('')

    };


    const columns = useMemo(
        () => [
            {
                accessorKey: 'crimeType',
                header: 'Crime Type',
                size: 150,
            },
            {
                accessorKey: 'complaintDescription',
                header: 'Description',
                size: 200,
            },
            {
                accessorKey: 'incidentLocation',
                header: 'Location',
                size: 150,
            },
            {
                accessorKey: 'incidentDate',
                header: 'Date',
                size: 100,
            },
            {
                accessorKey: 'inspector',
                header: 'Assigned Officer',
                size: 100,
            }
        ],
        []
    );


    const [reportData, setReportData] = useState([]);

    const fetchData = () => {
        axios.get('http://localhost:3001/registered-firs')
            .then((response) => {
                setReportData(response.data)

            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fileFIR = (row) => {
        const crimeType = row.crimeType;
        const complaintDescription = row.complaintDescription;
        const incidentDate = row.incidentDate;
        const incidentLocation = row.incidentLocation;
        const stationCode = row.stationCode;
        const incidentDescription = row.incidentDescription;
        const evidenceFile = row.evidenceFile;
        const witnessStatement = row.witnessStatement;
        const witnessContact = row.witnessContact;
        const witnessAddress = row.witnessAddress;
        const additionalDetails = row.additionalDetails;
        const witnessName = row.witnessName;
        const contact = row.contact;
        const userEmail = row.userEmail;
        const userName = row.userName;
        const reportedAt = row.reportedAt;
        const reportedTime = row.reportedTime
        const status = row.status;
        const complaintCode = row.complaintCode;
        const inspector = row.inspector;
        const firRegisteredAt = new Date(); // Get the current timestamp
        const year = firRegisteredAt.getFullYear();
        const month = firRegisteredAt.getMonth() + 1; // Adding 1 because months are zero-based (0 = January)
        const day = firRegisteredAt.getDate();
        const dateOnly = new Date(year, month - 1, day);
        const hours = firRegisteredAt.getHours();
        const minutes = firRegisteredAt.getMinutes();



        axios.post(`http://localhost:3001/solve-fir`, {
            crimeType,
            complaintDescription,
            incidentDate,
            incidentLocation,
            stationCode,
            incidentDescription,
            evidenceFile,
            witnessStatement,
            witnessContact,
            witnessAddress,
            additionalDetails,
            witnessName,
            contact,
            userEmail,
            userName,
            reportedAt,
            reportedTime,
            status: "Solved",
            complaintCode,
            inspector,
            firRegisteredAt: `Date: ${dateOnly} , Time: ${hours}:${minutes}`,
        })
            .then(() => {
                alert('First-Information-Report filed!')
            })
            .then(() => {
                axios.delete(`http://localhost:3001/delete-fir/${row._id}`)
                    .then(() => {
                        console.log("Complaint removed");
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            });


        console.log("Edit row:", row);
    };


    const handlePending = (row) => {
        // Implement the logic to delete the row here
        const crimeType = row.crimeType;
        const complaintDescription = row.complaintDescription;
        const incidentDate = row.incidentDate;
        const incidentLocation = row.incidentLocation;
        const stationCode = row.stationCode;
        const incidentDescription = row.incidentDescription;
        const evidenceFile = row.evidenceFile;
        const witnessStatement = row.witnessStatement;
        const witnessContact = row.witnessContact;
        const witnessAddress = row.witnessAddress;
        const additionalDetails = row.additionalDetails;
        const witnessName = row.witnessName;
        const contact = row.contact;
        const userEmail = row.userEmail;
        const userName = row.userName;
        const reportedAt = row.reportedAt;
        const reportedTime = row.reportedTime
        const status = row.status;
        const complaintCode = row.complaintCode;
        const inspector = row.inspector;
        const firRegisteredAt = new Date(); // Get the current timestamp
        const year = firRegisteredAt.getFullYear();
        const month = firRegisteredAt.getMonth() + 1; // Adding 1 because months are zero-based (0 = January)
        const day = firRegisteredAt.getDate();
        const hours = firRegisteredAt.getHours();
        const minutes = firRegisteredAt.getMinutes();


        const dateOnly = new Date(year, month - 1, day);
        setRegistrationTime(hours + ":" + minutes);


        axios.put(`http://localhost:3001/pending-fir/${row._id}`, {
            crimeType,
            complaintDescription,
            incidentDate,
            incidentLocation,
            stationCode,
            incidentDescription,
            evidenceFile,
            witnessStatement,
            witnessContact,
            witnessAddress,
            additionalDetails,
            witnessName,
            contact,
            userEmail,
            userName,
            reportedAt,
            reportedTime,
            status: "Pending",
            complaintCode,
            inspector,
            firRegisteredAt: `Date: ${dateOnly} , Time: ${hours}:${minutes}`,
        })
            .then((response) => {
                alert('Complaint added to the pending list');
            }).catch((error) => {
                console.log(error);
            })

        const updatedData = reportData.filter((item) => item._id !== row._id);
        setReportData(updatedData);
        closeDialog();

    };

    const updateFetch = async (row) => {
        try {

            const response = await axios.get('http://localhost:3001/progress-updates')
                .then((response) => {
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].compCode === row.complaintCode) {
                            setFormData(response.data[i]);
                        }
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }






    const sendEmail = async (row) => {
        try {
            axios.post('http://localhost:3001/update-mail', {
                email: row.email,
                progress: row.progress,
                status: row.status,
                officerName: row.officerName,
                name: row.name,
                complaintCode: row.compCode
            })
                .then(() => {
                    alert("Email sent!");
                    window.location.reload();
                })
        } catch (err) {
            alert("Could not send the email!")
            console.log(err);
        }
    }

    return (
        <div className="mt-5">
            <h2>First-Information-Report</h2>
            <div className="container-fluid mt-5">
                <div className="row" id='table-main'>
                    <div className='col-12'>

                        <div >
                            <MaterialReactTable col displayColumnDefOptions={{
                                'mrt-row-actions': {
                                    muiTableHeadCellProps: {
                                        align: 'center',
                                    },
                                    size: 120,
                                },
                            }}
                                columns={columns}
                                data={reportData}
                                editingMode="modal"
                                enableColumnOrdering
                                enableEditing
                                renderRowActions={({ row, table }) => (
                                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                                        {console.log(row.original)}
                                        <Tooltip arrow placement="left" title="Update">
                                            <IconButton color='primary' onClick={() => openDialog(row.original)}>
                                            <FontAwesomeIcon icon={faSearch} className="fa-magnifying-glass" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip arrow placement="right" title="Updates">
                                            <IconButton color="success" onClick={() => openSecondDialog(row.original)}>
                                                <FontAwesomeIcon icon={faPenNib} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )}
                            />                        </div>
                    </div>

                    <Dialog open={dialogOpen} onClose={closeDialog}>
                        <DialogTitle>Investigate Crime</DialogTitle>
                        <DialogContent>
                            {rowData && (
                                <ul className='list-unstyled p-2'>
                                    <li className='text-center'><b>Complaint Details</b></li>
                                    <li><b>Crime Type</b>: {rowData.crimeType}</li>
                                    <li><b>Complaint Description</b>: {rowData.complaintDescription}</li>
                                    <li><b>Date</b>: {rowData.incidentDate}</li>
                                    <li><b>Location</b>: {rowData.incidentLocation}</li>
                                    <li><b>Incident Description</b>: {rowData.incidentDescription}</li>
                                    <li><b>Station Code</b>: {rowData.stationCode}</li>
                                    <li><b>Additional Details</b>:{rowData.additionalDetails}</li>
                                    {!rowData.witnessName ? (
                                        <>
                                            <li className='text-center my-1'><b>Witness Details</b></li>
                                            <li><b>Witness</b>: None</li>
                                        </>
                                    ) : (
                                        <>
                                            <li><b>Witness Details</b></li>
                                            <li><b>WitnessName</b>:{rowData.witnessName}</li>
                                            <li><b>WitnessContact</b>:{rowData.witnessContact}</li>
                                            <li><b>WitnessAddress</b>:{rowData.witnessAddress}</li>
                                        </>
                                    )}
                                    {rowData.evidenceFile && (
                                        <img
                                            src={`data:image/jpeg;base64,${rowData.evidenceFile}`}
                                            alt="Evidence"

                                        />

                                    )}
                                    <li className='text-center my-1'><b>Complainant Details</b></li>
                                    <li><b>Email</b>: {rowData.userEmail}</li>
                                    <li><b>Name</b>: {rowData.userName}</li>
                                    <li><b>Contact</b>:{rowData.contact}</li>
                                    <li><b>Reported at</b>: {rowData.reportedAt}</li>
                                    <li><b>Time</b>: {rowData.reportedTime}</li>
                                    <li><b>Complaint Code</b>: {rowData.complaintCode}</li>
                                </ul>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={secondDialogOpen} onClose={closeSecondDialog}>
                        <DialogTitle>Update</DialogTitle>
                        <DialogContent>
                            <DialogContent>
                                <ul className='list-unstyled p-2'>
                                    <li className='text-center'><b>Complaint Status Update</b></li>
                                    {formData ? (
                                        <>
                                            <li><b>Progress</b>: {formData.progress}</li>
                                            <li><b>Status</b>: {formData.status}</li>
                                            <li><b>Officer Name</b>: {formData.officerName}</li>
                                            <li><b>Complainant Email</b>: {formData.email}</li>
                                            <li><b>Name</b>: {formData.name}</li>
                                            <li><b>Officer Number</b>: {formData.officerNumber}</li>
                                            <li><b>FIR No</b>: {formData.firCode}</li>
                                            <li><b>Complaint Code</b>: {formData.compCode}</li>
                                        </>
                                    ) : (
                                        <li className='text-center'>No updates yet</li>
                                    )}
                                </ul>
                            </DialogContent>

                        </DialogContent>
                        <DialogActions>

                            {formData && (
                                <Button color="primary" onClick={() => sendEmail(formData)}>
                                    Send Email
                                </Button>
                            )}
                            <Button onClick={closeSecondDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
            </div>
        </div>
    );
};

export default RegisteredFirs;
