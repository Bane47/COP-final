import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
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
import RowDetailsModal from '../model/TableModel';


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
        axios.get('http://localhost:3001/get-crimes')
            .then((response) => {
                setReportData(response.data)
            })
    }


    useEffect(() => {
        fetchData();
    }, [])




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

        axios.post('http://localhost:3001/file-fir', { type, dateTime, location, stationCode, description, evidence, vehicles, suspect, contact, status: 'Under Investigation', firRegisteredAt, officer, userEmail, userName, reportedAt, complaintCode })
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
        const complaintCode = row.complaintCode;
        const firRegisteredAt = new Date(); // Get the current timestamp
        setRegistrationTime(firRegisteredAt);


        axios.post('http://localhost:3001/post-softDelete', { type, dateTime, location, stationCode, description, evidence, vehicles, suspect, contact, firRegisteredAt, officer, userEmail, userName, reportedAt, complaintCode })
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
                                                <Edit />
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