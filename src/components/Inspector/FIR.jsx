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
import ProgressUpdateForm from '../Form/ProgressUpdateForm';


const FIR = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reportData, setReportData] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [rowData, setRowData] = useState({});
    const officerEmail = localStorage.getItem('userName');
    const [secondDialogOpen, setSecondDialogOpen] = useState(false);

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
        console.log(row)
        setRowData(row)
    };

    const closeDialog = () => {
        setDialogOpen(false);
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



    const fetchData = () => {
        axios.get(`http://localhost:3001/get-zones-email/${officerEmail}`)
            .then((response) => {
                console.log(response.data.stationCode)
                axios.get(`http://localhost:3001/registered-firs/${response.data.stationCode}`)
                    .then((response) => {
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
                                renderRowActions={({ row, table }) => (
                                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                                        <Tooltip arrow placement="right" title="View">
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
                            <li><b>FIR No</b>: {rowData.firCode}</li>
                            <li><b>Crime Type</b>: {rowData.crimeType}</li>
                            <li><b>Complaint Description</b>: {rowData.complaintDescription}</li>
                            <li><b>Date</b>: {rowData.incidentDate}</li>
                            <li><b>Location</b>: {rowData.incidentLocation}</li>
                            <li><b>Incident Description</b>: {rowData.incidentDescription}</li>
                            <li><b>Station Code</b>: {rowData.stationCode}</li>
                            <li><b>Evidence</b>: {rowData.evidenceFile}</li>
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
                    <Button onClick={openSecondDialog} color="primary">
                        Send Update
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={secondDialogOpen} onClose={closeSecondDialog}>
                <DialogTitle>Second Dialog</DialogTitle>
                <DialogContent>
                    <ProgressUpdateForm email={rowData.userEmail} firCode={rowData.firCode} compCode={rowData.complaintCode} name={rowData.userName} onSubmit={(formData) => {
                        // Handle the submission of progress update data here
                        console.log(formData);
                    }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeSecondDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default FIR;