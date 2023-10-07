import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useCallback } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
    Box,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import RowDetailsModal from '../model/TableModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';


const Reports = () => {
    const [registrationTime, setRegistrationTime] = useState(null);
    const officer = localStorage.getItem('userName');
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reportData, setReportData] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [rowData, setRowData] = useState({});
    const [formData, setFormData] = useState();
    const [secondDialogOpen, setSecondDialogOpen] = useState(false);
    const [image, setImage] = useState();
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0])
    };


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
                accessorKey: 'incidentLocation',
                header: 'Location',
                size: 150,
            },
            {
                accessorKey: 'incidentDate',
                header: 'Date',
                size: 100,
            }

        ],
        []
    );

    const investigateCrime = (row) => {
        const formData = new FormData(); // Use capital "D"
        formData.append('image', image);
        const crimeType = row.crimeType;
        const complaintDescription = row.complaintDescription;
        const incidentDate = row.incidentDate;
        const incidentLocation = row.incidentLocation;
        const stationCode = row.stationCode;
        const incidentDescription = row.incidentDescription;
        const evidenceFile = formData.image;
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
        setRegistrationTime(firRegisteredAt);

        axios.post('http://localhost:3001/admin-to-inspector', {
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
            status: "Under Investigation",
            complaintCode,
            inspector,
            firRegisteredAt,
        })
            .then(() => {
                axios.delete(`http://localhost:3001/delete-crime/${row._id}`)
                .then(()=>{
                    alert("Complaint sent to the Police station");
                    window.location.reload();
                })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            
            .catch((error) => {
                console.error(error);
            });

    };

    const deleteCrimeReport = (row) => {
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

        axios.post('http://localhost:3001/post-softDelete', {
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
            status: "Declined",
            complaintCode,
            inspector,
            firRegisteredAt,
            deletedTime: `Date: ${dateOnly} , Time: ${hours}:${minutes}`
        })
            .catch((error) => {
                console.error(error);
            })
        axios.delete(`http://localhost:3001/decline-fir/${row._id}`)
            .then((response) => {
                alert("Crime report is declined ", row._id);
                
            })
            .catch((error) => {
                console.error(error);

                alert("Couldn't decline the report")
            })
        const updatedData = reportData.filter((item) => item._id !== row._id);
        setReportData(updatedData);
        closeDialog();
    };





    const fetchData = async () => {
        axios.get('http://localhost:3001/get-crimes')
            .then((response) => {
                setReportData(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })

    }


    useEffect(() => {
        fetchData();
    }, [])


    return (
        <div>
            <h2>Un-Registered Reports</h2>
            <div className="container-fluid mt-5">
                <div className="row" id="table-main">
                    <div className="col-12">
                        <div>
                            <MaterialReactTable
                                col
                                displayColumnDefOptions={{
                                    'mrt-row-actions': {
                                        muiTableHeadCellProps: {
                                            align: 'center',
                                        },
                                        size: 120,
                                    },
                                }}
                                onRowClick={handleRowClick}
                                columns={columns}
                                data={reportData}
                                editingMode="modal"
                                enableColumnOrdering
                                enableEditing
                                positionActionsColumn="last"
                                renderRowActions={({ row, table }) => (
                                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                                        <Tooltip arrow placement="left" title="View">
                                            <IconButton onClick={() => openDialog(row.original)}>
                                                <FontAwesomeIcon icon={faSearch} className="fa-magnifying-glass" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip arrow placement="left" title="Updates">
                                            <IconButton onClick={() => openSecondDialog(row.original)}>
                                                <FontAwesomeIcon icon={faEdit} className="fa-edit" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )}
                            />
                            <RowDetailsModal selectedRow={selectedRow} onClose={closeModal} />
                        </div>
                    </div>
                </div>
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
                    <Button onClick={() => investigateCrime(rowData)} color="primary">
                        Investigate
                    </Button>
                    <Button onClick={() => deleteCrimeReport(rowData)} color="secondary">
                        Decline
                    </Button>
                </DialogActions>
            </Dialog>

            
        </div>
    );
};

export default Reports;