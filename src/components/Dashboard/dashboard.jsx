import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ReportCrime from '../Report/reportCrime';
import { Skeleton } from 'primereact/skeleton';
import mainImage from '../assets/GandhiDesktop.jpg'
import '../styles/dashboard.css'

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Show skeleton or actual image based on loading state */}
      {loading ? (
        <div className='mt-5 pt-5 '>
        <Skeleton height={300} width={1100} /> 
        <div className='row mt-5'>
          <div className='col-6'>
          <Skeleton height={100} width={200} /> 
          </div>
          <div className='col-6'>
          <Skeleton height={100} width={200} /> 
          </div>
        </div>
        </div>
      ) : (
        <>
        <img src={mainImage}  alt="" />
     

      <div className='col-6 mx-auto mt-5 mb-5 '>
        <Card>
          <Card.Body>
            <h2>Report a crime! </h2>
            <Link to='/ComplaintForm'>
              <Button as="input" type="button" value='Report' />
            </Link>
          </Card.Body>
        </Card>

        {/* Render the ReportCrime component based on showModal */}
        {showModal && (
          <ReportCrime crimeReport='true' showModal={showModal} setShowModal={setShowModal} />
        )}
      </div>

      <div className='col-6 mx-auto mt-5 mb-5'>
        <Card>
          <Card.Body>
            <h2>Check the status </h2>
            <Button as="input" type="button" value="Click" onClick={() => setCheckModal(true)} />
          </Card.Body>
        </Card>

        {/* Render the ReportCrime component for checking status */}
        {checkModal && (
          <ReportCrime checkStatus='true' showModal={checkModal} setShowModal={setCheckModal} />
        )}
      </div>
      </>

)}
    </>
  );
}

export default Dashboard;
