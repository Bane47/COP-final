import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'

const Reports = () => {
    const [registrationTime, setRegistrationTime] = useState(null);

    const columns = [
        {
            name: "Crime Type",
            selector: row => row.type,
            sortable: true
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
            name: "Register",
            cell: (row) => (
                <button onClick={() => fileFIR(row)}>Register</button>
            ),
            button: true,
        },
        {
            name: "Delete",
            cell: (row) => (
                <button onClick={() => handleDelete(row)}>Delete</button>
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
        const timestamp = new Date(); // Get the current timestamp
        setRegistrationTime(timestamp);
        axios.post('http://localhost:3001/file-fir', row,timestamp)
            .then((response) => {
                console.log(response);
            }).catch((error)=>{
                console.error(error);
            })
        console.log("Edit row:", row);
    };


    const handleDelete = (row) => {
        // Implement the logic to delete the row here
        console.log("Delete row:", row);
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
