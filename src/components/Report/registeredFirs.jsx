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
                accessorKey: 'type',
                header: 'Crime Type',
                size: 150,
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 200,
            },
            {
                accessorKey: 'location',
                header: 'Location',
                size: 150,
            },
            {
                accessorKey: 'contact',
                header: 'Contact',
                size: 150,
            },
            {
                accessorKey: 'dateTime',
                header: 'Date and Time',
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

    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState(reportData);

    const handleFilter = (event) => {
        const inputValue = event.target.value.toLowerCase();
        setFilterText(inputValue);

        const newData = reportData.filter((row) => {
            return row.type.toLowerCase().includes(inputValue);
        });
        setFilteredData(newData);
    };

    const fileFIR = (row) => {
        const type = row.type;
        const dateTime = row.dateTime;
        const location = row.location;
        const stationCode = row.stationCode;
        const description = row.description;
        const evidence = row.evidence;
        const vehicles = row.vehicles;
        const suspect = row.suspect;
        const contact = row.contact;
        const userEmail = row.userEmail;
        const userName = row.userEmail;
        const reportedAt = row.reportedAt;
        const complaintCode = row.complaintCode;
        const firRegisteredAt = new Date(); // Get the current timestamp
        setRegistrationTime(firRegisteredAt);

        axios.post(`http://localhost:3001/solve-fir`, {
            type,
            dateTime,
            location,
            stationCode,
            description,
            evidence,
            vehicles,
            suspect,
            contact,
            status: 'Solved',
            firRegisteredAt,
            officer,
            userEmail,
            userName,
            reportedAt,
            complaintCode
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
        const type = row.type;
        const dateTime = row.dateTime;
        const location = row.location;
        const stationCode = row.stationCode;
        const description = row.description;
        const evidence = row.evidence;
        const vehicles = row.vehicles;
        const suspect = row.suspect;
        const contact = row.contact;
        const userEmail = row.userEmail;
        const userName = row.userName;
        const reportedAt = row.reportedAt;
        const firRegisteredAt = new Date(); // Get the current timestamp
        const complaintCode = row.complaintCode;
        setRegistrationTime(firRegisteredAt);


        axios.put(`http://localhost:3001/pending-fir/${row._id}`, { type, dateTime, location, stationCode, description, evidence, vehicles, suspect, contact, firRegisteredAt, officer, userEmail, userName, reportedAt, complaintCode })
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
