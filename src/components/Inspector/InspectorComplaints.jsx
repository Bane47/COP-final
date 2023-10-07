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
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const InspectorComplaints = () => {
    const [registrationTime, setRegistrationTime] = useState(null);
    const officer = localStorage.getItem('userName');
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reportData, setReportData] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [rowData, setRowData] = useState({});
    const officerEmail = localStorage.getItem('userName');
    var firCode ;


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
        setRowData(row)
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const firCodeGenerator=(crimeType,incidentDate,incidentLocation,stationCode,complaintCode)=>{
        return (crimeType[0]+crimeType[1]+incidentDate[0]+incidentDate[1]+incidentLocation[0]+incidentLocation[1]+stationCode+complaintCode[0]+complaintCode[1]+complaintCode[2]+(Math.floor((Math.random()*1000)+1)))
    }

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
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 100,
            }

        ],
        []
    );

    const investigateCrime = (row) => {
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
        setRegistrationTime(firRegisteredAt);


        axios.post('http://localhost:3001/file-fir', {
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
            status: "First Information Report filed",
            complaintCode,
            inspector,
            firCode:firCodeGenerator(crimeType,incidentDate,incidentLocation,stationCode,complaintCode),
            firRegisteredAt,
        })
            .then(() => {
                axios.delete(`http://localhost:3001/admin-to-inspector/${row._id}`)
                .catch((err) => {
                        console.log(err);
                });
            })
            .then(() => {
                alert("First Information Report filed!");
                window.location.reload();
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



        axios.post(`http://localhost:3001/pending-fir/${row._id}`, {
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
            firRegisteredAt,
            deletedTime: `Date: ${dateOnly} , Time: ${hours}:${minutes}`
        })
        .catch((error) => {
                console.error(error);
            })

        const updatedData = reportData.filter((item) => item._id !== row._id);
        setReportData(updatedData);
        closeDialog();
    };




    const fetchData = () => {
        axios.get(`http://localhost:3001/get-zones-email/${officerEmail}`)
        .then((response) => {
            console.log(response.data)
            axios.get(`http://localhost:3001/admin-to-inspector/${response.data.stationCode}`)
            .then((response)=>{
                setReportData(response.data);
                console.log(response.data)
            })
        })
        .catch((error) => {
            console.log(error)
        });
    }


    useEffect(() => {
        fetchData();
    }, [])





    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState(() => reportData);
    const [validationErrors, setValidationErrors] = useState({});


    return (
        <div>

            <div className="container-fluid mt-5">
                <h2>Reports from the control room</h2>
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

                                renderRowActions={({ row, table }) => (
                                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                                        <Tooltip arrow placement="left" title="View">
                                            <IconButton onClick={() => openDialog(row.original)}>
                                                <FontAwesomeIcon icon={faSearch} className="fa-magnifying-glass" />
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
                            <li><b>Status</b>: {rowData.status}</li>

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
                        File FIR
                    </Button>
                    <Button onClick={() => deleteCrimeReport(rowData)} color="secondary">
                        Add to pending
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default InspectorComplaints;