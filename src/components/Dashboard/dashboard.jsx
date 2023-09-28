import mainImage from '../assets/GandhiDesktop.jpg'
import '../styles/dashboard.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ReportCrime from '../Report/reportCrime';



function Dashboard() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>

      <img src={mainImage} alt="" />

      <div className='col-6 mx-auto mt-5 mb-5 '>
        <Card>
          <Card.Body>
            <h2>Report a crime!</h2>
            <Button as="input" type="button" value="Click" onClick={() => setShowModal(true)} />
          </Card.Body>
        </Card>
       
        <ReportCrime showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
}

export default Dashboard;