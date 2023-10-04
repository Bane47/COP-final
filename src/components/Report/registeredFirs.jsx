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
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import RowDetailsModal from '../model/TableModel';


const RegisteredFirs = () => {
    const [registrationTime, setRegistrationTime] = useState(null);
    const officer = localStorage.getItem('userName');
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRowClick = (row) => {
        setSelectedRow(row);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedRow(null);
        setIsModalOpen(false);
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
                accessorKey: 'contact',
                header: 'Contact',
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
            },
            {
                accessorKey: 'userName',
                header: 'Complainant Name',
                size: 100,
            },
            {
                accessorKey: 'reportedAt',
                header: 'Reported Date',
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
            firRegisteredAt:`Date: ${dateOnly} , Time: ${hours}:${minutes}`,
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
        setRegistrationTime(hours+":"+minutes);


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
            status:"Pending",
            complaintCode,
            inspector,
            firRegisteredAt:`Date: ${dateOnly} , Time: ${hours}:${minutes}`,          
            })
            .then((response) => {
                alert('Complaint added to the pending list');
            }).catch((error) => {
                console.log(error);
            })

    };

    return (
        <div className="mt-5">
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
                                        <Tooltip arrow placement="left" title="Investigate">
                                            <IconButton color='primary' onClick={() => fileFIR(row.original)}>
                                                <FontAwesomeIcon icon={faCircleCheck} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip arrow placement="right" title="Decline">
                                            <IconButton color="error" onClick={() => handlePending(row.original)}>
                                                <FontAwesomeIcon icon={faProductHunt} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )}
                            />                        </div>
                    </div>
                    <RowDetailsModal selectedRow={selectedRow} onClose={closeModal} />

                </div>
            </div>
        </div>
    );
};

export default RegisteredFirs;
