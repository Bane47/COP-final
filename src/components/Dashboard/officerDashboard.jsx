import React, { useState, useEffect } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Skeleton } from 'primereact/skeleton';
import '../styles/dashboard.css';
import logo from '../assets/Crimereport.jpg';
import logo1 from '../assets/fir.jpg';
import logo2 from '../assets/Recruitment.jpg';
import axios from 'axios';

const OfficerDashboard = () => {
  const [loading, setLoading] = useState(true); // Add loading state
  const [reportData, setReportData] = useState();
  const [reportData2, setReportData2] = useState();
  const officerEmail = localStorage.getItem('userName');


  useEffect(() => {
    // Simulate loading for 2 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

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
            <div className='my-5  col-4'>
              <Card className='border-0 crime-card shadow-lg'>
                <Card.Body>
                  <Link to='/firs'>
                    <img src={logo} className='img-fluid card-img-docs c-card' alt="" />
                  </Link>
                  <h4>Look at the crime reports!</h4>

                  <Badge bg="danger" pill className="badge-counter">
                    {reportData}
                  </Badge>
                </Card.Body>
              </Card>
            </div>

            <div className='my-5  col-4'>
              <Card className='border-0 crime-card shadow-lg'>
                <Card.Body>
                  <Link to='/registeredFirs'>
                    <img src={logo1} className='img-fluid card-img-docs c-card' alt="" />
                  </Link>
                  <h4>Look at the overall FIRs!</h4>

                  <Badge bg="danger" pill className="badge-counter">
                    {reportData2}
                  </Badge>
                </Card.Body>
              </Card>
            </div>

            <div className='my-5  col-4'>
              <Card className='border-0 crime-card shadow-lg'>
                <Card.Body>
                  <Link to='/officers-page'>
                    <img src={logo2} className='img-fluid card-img-docs c-card' alt="" />
                  </Link>
                  <h4>Officers</h4>

                  
                </Card.Body>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OfficerDashboard;
