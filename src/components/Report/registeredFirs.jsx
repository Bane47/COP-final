import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'

const RegisteredFirs = () => {
    const [registrationTime, setRegistrationTime] = useState(null);
    const officer = localStorage.getItem('userName')
    const columns = [
        {
            name: "Crime Type",
            selector: row => row.type,
            sortable: true,
            style: {
                fontWeight: 'bold',
                color: 'black',
                backgroundColor: 'lightblue',
                width: '100px'
            }
        },
        {
            name: "Description",
            selector: row => row.description,
            sortable: true,
            style: {
                fontWeight: 'bold',
                color: 'black',
                backgroundColor: 'lightblue'
            }
        },
        {
            name: "Location",
            selector: row => row.location,
            sortable: true,
            style: {
                fontWeight: 'bold',
                color: 'black',
                backgroundColor: 'lightblue'
            }
        },
        {
            name: "Contact",
            selector: row => row.contact,
            style: {
                fontWeight: 'bold',
                color: 'black',
                backgroundColor: 'lightblue'
            }
        },
        {
            name: "Date and Time",
            selector: row => row.dateTime,
            sortable: true,
            style: {
                fontWeight: 'bold',
                color: 'black',
                backgroundColor: 'lightblue'
            }
        },
        {
            name: "Status",
            selector: row => row.status,
            style: {
                color: 'green',
                fontWeight: "bold",
                backgroundColor: 'lightblue'
            }
        },
        {
            name: "Update",
            cell: (row) => (
                <button onClick={() => fileFIR(row)} className='btn' >Solve</button>
            ),
            button: true,
            style: {
                fontWeight: 'bold',
                color: 'black',
                backgroundColor: 'lightblue'
            }
        },
        {
            name: "Pending",
            cell: (row) => (
                <button onClick={() => handlePending(row)} className='btn'>Pending</button>
            ),
            button: true,
            style: {
                fontWeight: 'bold',
                color: 'black',
                backgroundColor: 'lightblue'
            }
        }
    ];
    const customStyles = {
        head: {
            style: {
                backgroundColor: 'lightblue',
                color: 'Black',

            },
        },
    };

    const [reportData, setReportData] = useState([]);

    const fetchData = () => {
        axios.get('http://localhost:3001/registered-firs')
            .then((response) => {
                setReportData(response.data)
                console.log(response.data, "This is the value")
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
            }).catch((error) => {
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

        
        axios.put(`http://localhost:3001/pending-fir/${row._id}`, { type, dateTime, location, stationCode, description, evidence, vehicles, suspect, contact,firRegisteredAt, officer, userEmail, userName, reportedAt,complaintCode })
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
                        <div className='text-end mb-4'>
                            <input type="text" value={filterText} placeholder=' Search a crime' onChange={handleFilter} />
                        </div>
                        <div >
                            <DataTable id="datatable-main" columns={columns} data={filteredData} noHeader fixedHeader highlightOnHover subHeaderWrap expandOnRowClicked responsive progressComponent pagination striped customStyles={customStyles} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisteredFirs;
