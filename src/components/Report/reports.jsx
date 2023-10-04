import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useCallback } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import RowDetailsModal from '../model/TableModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const Reports = () => {
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
        axios.get('http://localhost:3001/get-crimes')
            .then((response) => {
                setReportData(response.data)
            })
    }


    useEffect(() => {
        fetchData();
    }, [])


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
            status:"Under Investigation",
            complaintCode,
            inspector,
            firRegisteredAt,
         })
            .then((response) => {

                axios.delete(`http://localhost:3001/delete-crime/${row._id}`)
                    .then((response) => {

                    }).catch((err) => {
                        console.log(err);
                    })
            }).catch((error) => {
                console.error(error);
            });


    };


    const handleDelete = (row) => {

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
            status:"Declined",
            complaintCode,
            inspector,
            firRegisteredAt,  
            deletedTime:`Date: ${dateOnly} , Time: ${hours}:${minutes}`
              })
            .catch((error) => {
                console.error(error);
            })
        axios.delete(`http://localhost:3001/decline-fir/${row._id}`)
            .then((response) => {
                alert("Crime report is declined oajnsc", row._id);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);

                alert("Couldn't decline the report")
            })

    };


    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState(() => reportData);
    const [validationErrors, setValidationErrors] = useState({});


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
                                onRowClick={handleRowClick}
                                columns={columns}
                                data={reportData}
                                editingMode="modal" //default
                                enableColumnOrdering
                                enableEditing
                                renderRowActions={({ row, table }) => (
                                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                                        {console.log(row.original)}
                                        <Tooltip arrow placement="left" title="Investigate">
                                            <IconButton onClick={() => fileFIR(row.original)}>
                                            <FontAwesomeIcon icon={faSearch} className="fa-magnifying-glass" />
                                             </IconButton>
                                        </Tooltip>
                                        <Tooltip arrow placement="right" title="Decline">
                                            <IconButton color="error" onClick={() => handleDelete(row.original)}>
                                                <Delete />
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
        </div>
    );
};

export default Reports;