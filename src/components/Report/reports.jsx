import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'

const Reports = () => {
    const [registrationTime, setRegistrationTime] = useState(null);
    const officer = localStorage.getItem('userName')
    const columns = [
        {
            name: "Crime Type",
            selector: row => row.type,
            sortable: true,
            style: {
                fontWeight: 'bold',
                color: 'blue',
            }
        },
        {
            name: "Description",
            selector: row => row.description,
            sortable: true
        },
        {
            name: "Location",
            selector: row => row.location,
            sortable: true
        },
        {
            name: "Contact",
            selector: row => row.contact,
        },
        {
            name: "Date and Time",
            selector: row => row.dateTime,
            sortable: true
        },
        {
            name: "Confidentiality",
            selector: row => row.confidentiality
        },
        {
            name: "Investigate",
            cell: (row) => (
                <button onClick={() => fileFIR(row)}>Investigate</button>
            ),
            button: true,
        },
        {
            name: "Delete",
            cell: (row) => (
                <button onClick={() => handleDelete(row)}>Decline</button>
            ),
            button: true,
        }
    ];

    const [reportData, setReportData] = useState([]);

    const fetchData = () => {
        axios.get('http://localhost:3001/get-crimes')
            .then((response) => {
                setReportData(response.data)
                console.log(response.data, "This is the value")
            })
    }


    useEffect(() => {
        fetchData();
        console.log(officer)
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

        axios.post('http://localhost:3001/file-fir', { type, dateTime, location, stationCode, description, evidence, vehicles, suspect, contact, status: 'Under Investigation', firRegisteredAt, officer, userEmail, userName, reportedAt,complaintCode })
            .then((response) => {
                console.log(response);
                axios.delete(`http://localhost:3001/delete-crime/${row._id}`)
                    .then((response) => {
                        console.log(response);
                    }).catch((err) => {
                        console.log(err);
                    })
            }).catch((error) => {
                console.error(error);
            });

        console.log("Edit row:", row);
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


        axios.post('http://localhost:3001/post-softDelete', { type, dateTime, location, stationCode, description, evidence, vehicles, suspect, contact, firRegisteredAt, officer, userEmail, userName, reportedAt,complaintCode })
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error(error);
            })
        axios.delete(`http://localhost:3001/decline-fir/${row._id}`)
            .then((response) => {
                alert("Crime report is declined");
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                alert("Couldn't decline the report")
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
                        {console.log(reportData)}
                        <div >
                            <DataTable id="datatable-main" columns={columns} data={filteredData} fixedHeader highlightOnHover subHeaderWrap expandOnRowClicked responsive progressComponent pagination striped />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
