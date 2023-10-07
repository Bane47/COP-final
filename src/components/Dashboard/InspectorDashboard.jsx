import React, { useState, useEffect } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Skeleton } from 'primereact/skeleton';
import '../styles/dashboard.css'
import logo from '../assets/Crimereport.jpg'
import logo1 from '../assets/fir.jpg';
import axios from 'axios';
// import '../styles/inspDashboard.css'


const InspectorDashboard = () => {
  const [loading, setLoading] = useState(true); // Add loading state
  const officerEmail = localStorage.getItem('userName');
  const [reportData, setReportData] = useState();
  const [reportData2, setReportData2] = useState();


  const fetchData = () => {
    axios.get(`http://localhost:3001/get-zones-email/${officerEmail}`)
      .then((response) => {
        console.log(response.data.stationCode)
        axios.get(`http://localhost:3001/registered-firs/${response.data.stationCode}`)
          .then((response) => {
            setReportData(response.data.length);
            console.log(response.data.length)

          })
      })
      .catch((error) => {
        console.log(error)
      });

    axios.get(`http://localhost:3001/get-zones-email/${officerEmail}`)
      .then((response) => {
        console.log(response.data.stationCode)
        axios.get(`http://localhost:3001/get-crimes/${response.data.stationCode}`)
          .then((response) => {
            setReportData2(response.data.length);
            console.log(response.data.length)

          })
      })
      .catch((error) => {
        console.log(error)
      });
  }

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    fetchData();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mt-5">
      {loading ? (
        <>
          <div className='mt-5'>
            <Card>
              <Card.Body>
                <div className='my-2'>
                  <Skeleton height={50} width={200} />
                </div>
                <div className='my-2'>
                  <Skeleton height={30} width={300} />
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className='mt-5'>
            <Card>
              <Card.Body>
                <div className='my-2'>
                  <Skeleton height={50} width={200} />
                </div>
                <div className='my-2'>
                  <Skeleton height={30} width={300} />
                </div>
              </Card.Body>
            </Card>
          </div>
        </>
      ) : (
        <>

          <marquee behavior="scroll" direction="left" scrollamount="10">

            New Crime Prevention Measures Implemented -
            Upcoming Community Outreach Event -
            Monthly Crime Statistics Report Available
          </marquee>




          <div className='row'>
            <div className='my-5  col-6 position-relative'>
              <div className='text-end '>
              <Badge bg="danger" pill className="badge-counter position-absolute">
                {reportData}
              </Badge>
              </div>
              <Card className='border-0 crime-card shadow-lg'>
                <Card.Body>
                  <Link to='/Fir'>
                    <img src={logo} className='img-fluid card-img-docs c-card' alt="" />
                  </Link>
                  <h5>First-Information-Reports!</h5>

                </Card.Body>
              </Card>
            </div>

            <div className='my-5  col-6 position-relative'>
            <div className='text-end '>
              <Badge bg="danger" pill className="badge-counter position-absolute">
                {reportData2}
              </Badge>
              </div>
              <Card className='border-0 crime-card shadow-lg'>
                <Card.Body>
                  <Link to='/InspectorComplaints'>
                    <img src={logo1} className='img-fluid card-img-docs c-card' alt="" />
                  </Link>

                  <h5>Un-Registered-Reports!</h5>
                </Card.Body>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default InspectorDashboard;
