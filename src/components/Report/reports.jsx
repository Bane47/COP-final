import axios from 'axios';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component'

const Reports = () => {
    const columns = [{
        name: "Name",
        selector: row => row.name,
        sortable:true

    }, {
        name: "Email",
        selector: row => row.email,
        sortable:true

    },
    {
        name: "Age",
        selector: row => row.age,
        sortable:true

    }
    ];
    const data = [
        {
            id: 1,
            name: "Darshan",
            email:"Darshan@gmail.com",
            age:21
        },{
            id:2,
            name:"Sharon",
            email:"Sharon@gmail.com",
            age:21
        },{
            id:3,
            name:"Hemanth",
            email:"Hemanth@gmail.com",
            age:21
        }, {
            id: 1,
            name: "Darshan",
            email:"Darshan@gmail.com",
            age:21
        },{
            id:2,
            name:"Sharon",
            email:"Sharon@gmail.com",
            age:21
        },{
            id:3,
            name:"Hemanth",
            email:"Hemanth@gmail.com",
            age:21
        }, {
            id: 1,
            name: "Darshan",
            email:"Darshan@gmail.com",
            age:21
        },{
            id:2,
            name:"Sharon",
            email:"Sharon@gmail.com",
            age:21
        },{
            id:3,
            name:"Hemanth",
            email:"Hemanth@gmail.com",
            age:21
        }, {
            id: 1,
            name: "Darshan",
            email:"Darshan@gmail.com",
            age:21
        },{
            id:2,
            name:"Sharon",
            email:"Sharon@gmail.com",
            age:21
        },{
            id:3,
            name:"Hemanth",
            email:"Hemanth@gmail.com",
            age:21
        }, {
            id: 1,
            name: "Darshan",
            email:"Darshan@gmail.com",
            age:21
        },{
            id:2,
            name:"Sharon",
            email:"Sharon@gmail.com",
            age:21
        },{
            id:3,
            name:"Hemanth",
            email:"Hemanth@gmail.com",
            age:21
        }
    ]
    const [reportData,setReportData] = useState();

    const fetchData=()=>{
        axios.get('http://localhost:3000/get-crimes')
        .then((response)=>{
            
        })
    }
    
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleFilter = (event) => {
        const inputValue = event.target.value.toLowerCase();
        setFilterText(inputValue);

        const newData = data.filter((row) => {
            return row.name.toLowerCase().includes(inputValue);
        });
        setFilteredData(newData);
    };

    return (
        <div className='dashboard-main'>
            <div className='text-end'>
                <input type="text" value={filterText} onChange={handleFilter} />
            </div>
            <DataTable columns={columns} data={filteredData} fixedHeader pagination striped />
        </div>
    );
};

export default Reports;