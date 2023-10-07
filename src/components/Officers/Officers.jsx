import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
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
    TextField,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faSearch } from '@fortawesome/free-solid-svg-icons';
import ProgressUpdateForm from '../Form/ProgressUpdateForm';

const Officers = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [reportData, setReportData] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [rowData, setRowData] = useState({});
    const [secondDialogOpen, setSecondDialogOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

    // State variables to store the updated values of editable fields
    const [updatedName, setUpdatedName] = useState('');
    const [updatedAge, setUpdatedAge] = useState('');
    const [updatedStationDetails, setUpdatedStationDetails] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedCategory, setUpdatedCategory] = useState('');
    const [updatedGender, setUpdatedGender] = useState('');
    const [updatedArea, setUpdatedArea] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); 


    const openSecondDialog = () => {
        setSecondDialogOpen(true);
    };

    const closeSecondDialog = () => {
        setSecondDialogOpen(false);
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
        setEditMode(false);
    };

    const startEdit = () => {
        setEditMode(true);
        // Set the initial values of the editable fields
        setUpdatedName(rowData.name);
        setUpdatedAge(rowData.age);
        setUpdatedStationDetails(rowData.stationDetails);
        setUpdatedEmail(rowData.email);
        setUpdatedCategory(rowData.category);
        setUpdatedGender(rowData.gender);
        setUpdatedArea(rowData.area);
    };

    const saveChanges = () => {
        setEditMode(false);

        // Create an object with the updated data
        const updatedData = {
            name: updatedName,
            age: updatedAge,
            stationDetails: updatedStationDetails,
            email: updatedEmail,
            category: updatedCategory,
            gender: updatedGender,
            area: updatedArea,
        };

        // Update the inspector data through Axios
        updateInspectorData(rowData.email, updatedData);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                size: 150,
            },
            {
                accessorKey: 'stationDetails',
                header: 'Station',
                size: 150,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 100,
            },
            {
                accessorKey: 'contact',
                header: 'Contact',
                size: 100,
            },
        ],
        []
    );

    const fetchData = () => {
        axios
            .get(`http://localhost:3001/get-inspector/`)
            .then((response) => {
                setReportData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateInspectorData = (email, updatedData) => {
        axios
            .put(`http://localhost:3001/update-inspector/${email}`, updatedData)
            .then((response) => {
                console.log('Inspector data updated successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error updating inspector data:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>First-Information-Reports</h2>

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
                                renderRowActions={({ row }) => (
                                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                                        <Tooltip arrow placement="right" title="View"
                                        style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                                        >
                                            <IconButton onClick={() => openDialog(row.original)}>
                                                <FontAwesomeIcon style={{ color: 'blue'  }} icon={faPencil} className="fa-magnifying-glass" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={dialogOpen} onClose={closeDialog} fullWidth='sm' maxWidth='xs'>
                <DialogTitle>Investigate Crime</DialogTitle>
                <DialogContent>
                    {rowData && (
                        <ul className='list-unstyled p-2'>
                            <li className='text-center'>
                                <b>Officer Details</b>
                            </li>
                            {editMode ? (''):(
                            <li>
                                <b>Officer ID</b>:{rowData.id}
                                
                                    
                                
                            </li>
                            )}

                            <li>
                                <b>Name</b>:{' '}
                                {editMode ? (
                                    <TextField
                                        value={updatedName}
                                        onChange={(e) => setUpdatedAge(e.target.value)}
                                        size='small'
                                        fullWidth
                                    />
                                ) : (
                                    rowData.name
                                )}
                            </li>
                            <li>
                                <b>Age</b>:{' '}
                                {editMode ? (
                                    <TextField
                                        value={updatedAge}
                                        onChange={(e) => setUpdatedAge(e.target.value)}
                                        size='small'
                                        fullWidth
                                    />
                                ) : (
                                    rowData.age
                                )}
                            </li>
                            <li>
                                <b>Station</b>:{' '}
                                {editMode ? (
                                    <TextField
                                        value={updatedStationDetails}
                                        onChange={(e) => setUpdatedStationDetails(e.target.value)}
                                        size='small'
                                        fullWidth
                                    />
                                ) : (
                                    rowData.stationDetails
                                )}
                            </li>
                            <li>
                                <b>Email</b>:{' '}
                                {editMode ? (
                                    <TextField
                                        value={updatedEmail}
                                        onChange={(e) => setUpdatedEmail(e.target.value)}
                                        size='small'
                                        fullWidth
                                    />
                                ) : (
                                    rowData.email
                                )}
                            </li>
                            <li>
                                <b>Posting</b>:{' '}
                                {editMode ? (
                                    <TextField
                                        value={updatedCategory}
                                        onChange={(e) => setUpdatedCategory(e.target.value)}
                                        size='small'
                                        fullWidth
                                    />
                                ) : (
                                    rowData.category
                                )}
                            </li>
                            <li>
                                <b>Gender</b>:{' '}
                                {editMode ? (
                                    <TextField
                                        value={updatedGender}
                                        onChange={(e) => setUpdatedGender(e.target.value)}
                                        size='small'
                                        fullWidth
                                    />
                                ) : (
                                    rowData.gender
                                )}
                            </li>
                            <li>
                                <b>Area</b>:{' '}
                                {editMode ? (
                                    <TextField
                                        value={updatedArea}
                                        onChange={(e) => setUpdatedArea(e.target.value)}
                                        size='small'
                                        fullWidth
                                    />
                                ) : (
                                    rowData.area
                                )}
                            </li>
                        </ul>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Close
                    </Button>
                    {editMode ? (
                        <Button onClick={saveChanges} color="primary">
                            Save
                        </Button>
                    ) : (
                        <Button onClick={startEdit} color="primary">
                            Edit
                        </Button>
                    )}
                   
                </DialogActions>
            </Dialog>

          
        </div>
    );
};

export default Officers;