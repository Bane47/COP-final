import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

const ReportCrime = ({ showModal, setShowModal, crimeReport, checkStatus }) => {
  const userName = localStorage.getItem('userName');
  const email = localStorage.getItem('loggedUser');
  const contact = localStorage.getItem('contact')
  const [status, setStatus] = useState('');
  const [registeredStatus, setregisteredStatus] = useState('');
  const [solvedStatus, setSolvedStatus] = useState('');
  const [otherCrimeType, setOtherCrimeType] = useState();
  const [ComplaintCode, setComplaintCode] = useState(0);
  const [showComplaintCodeModal, setShowComplaintCodeModal] = useState(false);
  var complaintCode;

  const [crimeDetails, setCrimeDetails] = useState({
    crimeType: '',
    dateTime: '',
    location: '',
    stationCode: '',
    description: '',
    evidence: '',
    vehicles: '',
    suspect: '',
    contact: '',
    confidentiality: '',
    status: false
  });

  const [errors, setErrors] = useState({
    crimeType: '',
    dateTime: '',
    location: '',
    description: '',
    contact: '',
  });
  const [area, setArea] = useState(''); // State variable to store the selected area
  const [policeStationCode, setPoliceStationCode] = useState('');


  // Define a mapping of areas to police station codes
  const areaToCodeMap = {
    Vadavalli: 'A1',
    Ukkadam: 'A2',
    'Variety Hall Road': 'A3',
    Bazaar: 'A4',
    'R.S. Puram': 'A5',
    Saravanapatti: 'B1',
    Ramanathapuram: 'B2',
    Peelamedu: 'B3',
    Singanallur: 'B4',
    Kavundampalayam: 'C1',
    Thudialur: 'C2',
    Gandhipuram: 'C3',
    'Race Course': 'C4',
    Kattur: 'C5',
    'Saibaba Colony': 'C6',
    Rathinapuri: 'C7',
    'Awps - Coimbatore South': 'D1',
    Sundarapuram: 'D2',
    Karumbukadai: 'D3',
    Selvapuram: 'D4',
    kuniamuthur: 'D5',
    podanur: 'D6',
    'Ramanathapuram (South)': 'D7',
  };

  // Function to handle area selection
  const handleAreaChange = (event) => {
    const selectedArea = event.target.value;
    setArea(selectedArea);
    setCrimeDetails({ ...crimeDetails, 'location': selectedArea })
    // Set the police station code based on the selected area
    setPoliceStationCode(areaToCodeMap[selectedArea]);

  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCrimeDetails({ ...crimeDetails, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };
  const generateCode = (location, stationCode) => {
    complaintCode = location + stationCode + Math.floor(Math.random() * 100000);

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    generateCode(crimeDetails.location, policeStationCode)
    if (crimeDetails.crimeType === "Others") {
      setCrimeDetails({ ...crimeDetails, ['crimeType']: otherCrimeType })
    }
    const mandatoryFields = ['crimeType', 'dateTime', 'location', 'description'];
    let hasError = false;
    const updatedErrors = {};
    mandatoryFields.forEach((field) => {
      if (!crimeDetails[field]) {
        hasError = true;
        updatedErrors[field] = 'This field\'s required';
      }
    });
    if (hasError) {
      setErrors(updatedErrors);
      return;
    }
    const reportTime = new Date()



    axios.post('http://localhost:3001/post-crimes', {
      type: crimeDetails.crimeType,
      dateTime: crimeDetails.dateTime,
      location: crimeDetails.location,
      stationCode: policeStationCode,
      description: crimeDetails.description,
      contact: contact,
      confidentiality: crimeDetails.confidentiality,
      userName: userName,
      userEmail: email,
      reportedAt: reportTime,
      status: "Complaint registered",
      complaintCode: complaintCode
    }).then((response) => {
      console.log(response)
      if (response.status === 201) {
        console.log("Crime reported")
        alert('Crime reported successfully');
        setComplaintCode(complaintCode);
        setShowModal(false);
        setShowComplaintCodeModal(true);
        setCrimeDetails({
          crimeType: '',
          dateTime: '',
          location: '',
          stationCode: '',
          description: '',
          evidence: '',
          vehicles: '',
          suspect: '',
          contact: '',
          status: '',
          complaintCode: ''
        });

        return (
          <Modal show={showComplaintCodeModal} onHide={() => setShowComplaintCodeModal(false)} id="complaintCodeModal">
            <Modal.Header closeButton>
              <Modal.Title>Complaint Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Your complaint has been registered successfully.</p>
              <p>Complaint Code: {complaintCode}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowComplaintCodeModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )

      } else {
        console.error('Failed to report the crime. Please try again later.');
      }
    })
      .catch((error) => {
        console.error('Error during crime reporting:', error);
      });

  };

  const statusCheck = () => {
    const url1 = `http://localhost:3001/check-status-unregistered/${email}`;
    const url2 = `http://localhost:3001/check-status-registered/${email}`;
    const url3 = `http://localhost:3001/check-status-solved/${email}`;

    axios.get(url1)
      .then((response) => {
        setStatus(response.data);
      })
      .catch((error) => {
        console.log(email);
        console.log(error)
      });
    axios.get(url2)
      .then((response) => {
        setregisteredStatus(response.data);
      })
      .catch((error) => {
        console.log(email);
        console.log(error)
      });
    axios.get(url3)
      .then((response) => {
        setSolvedStatus(response.data);
      })
      .catch((error) => {
        console.log(email);
        console.log(error)
      });
  }

  useEffect(() => {
    statusCheck();
  }, [])

  return (
    <>
      {complaintCode && (
        <Modal show={showComplaintCodeModal} onHide={() => setShowComplaintCodeModal(false)} id="complaintCodeModal">
          <Modal.Header closeButton>
            <Modal.Title>Complaint Code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your complaint has been registered successfully.</p>
            <p>Complaint Code: {complaintCode}</p>
            <p>Use this code to check the status of your complaint</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowComplaintCodeModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {crimeReport && (
        <Modal show={showModal} onHide={() => setShowModal(false)} id="customModal">
          <Modal.Header closeButton>
            <Modal.Title>Report a Crime</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group id="formCrimeType">
                <Form.Label>Type of Crime</Form.Label>
                <Form.Control
                  as="select"
                  name="crimeType"
                  value={crimeDetails.crimeType}
                  onChange={handleInputChange}
                  required
                  isInvalid={!!errors.crimeType}
                >
                  <option value="">Select a type</option>
                  <option value="Murder">Murder</option>
                  <option value="Kidnap">Kidnap</option>
                  <option value="Theft">Theft</option>
                  <option value="Others">Others</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.crimeType}</Form.Control.Feedback>
              </Form.Group>
              {crimeDetails.crimeType === "Others" && (
                <Form.Group id="formLocation">
                  <Form.Label>Enter the crime type</Form.Label>
                  <Form.Control
                    type="text"
                    name="crimeType"
                    value={otherCrimeType}
                    onChange={(e) => setOtherCrimeType(e.target.value)}
                    required
                    isInvalid={!!errors.location}
                  />
                  <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                </Form.Group>
              )}
              <Form.Group id="formDateTime">
                <Form.Label>Date and Time of Incident</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="dateTime"
                  value={crimeDetails.dateTime}
                  onChange={handleInputChange}
                  required
                  isInvalid={!!errors.dateTime}
                />
                <Form.Control.Feedback type="invalid">{errors.dateTime}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group id="formLocation">
                <Form.Label>Area</Form.Label>
                <Form.Control
                  as="select"
                  name="location"
                  value={crimeDetails.location}
                  onChange={handleAreaChange}
                  required
                  isInvalid={!!errors.location}
                >
                  <option value="">Location of crime</option>

                  <optgroup label="Coimbatore West ACP Office">
                    <option value="Vadavalli">Vadavalli</option>
                    <option value="Ukkadam">Ukkadam</option>
                    <option value="Variety Hall Road">Variety Hall Road</option>
                    <option value="Bazaar">Bazaar</option>
                    <option value="R.S.Puram">R.S. Puram</option>
                  </optgroup>


                  <optgroup label="Coimbatore East ACP Office">
                    <option value="Saravanapatti">Saravanapatti</option>
                    <option value="Ramanathapuram">Ramanathapuram</option>
                    <option value="Peelamedu">Peelamedu</option>
                    <option value="Singanallur">Singanallur</option>
                  </optgroup>

                  <optgroup label="Coimbatore Central ACP Office">
                    <option value="Kavundampalayam">Kavundampalayam</option>
                    <option value="Thudialur">Thudialur</option>
                    <option value="Gandhipuram">Gandhipuram</option>
                    <option value="Race Course">Race Course</option>
                    <option value="Kattur">Kattur</option>
                    <option value="Saibaba Colony">Saibaba Colony</option>
                    <option value="Rathinapuri">Rathinapuri</option>
                  </optgroup>


                  <optgroup label="Coimbatore South ACP Office">
                    <option value="Awps - Coimbatore South">Awps - Coimbatore South</option>
                    <option value="Sundarapuram">Sundarapuram</option>
                    <option value="Karumbukadai">Karumbukadai</option>
                    <option value="Selvapuram">Selvapuram</option>
                    <option value="kuniamuthur">Kuniamuthur</option>
                    <option value="podanur">Podanur</option>
                    <option value="Ramanathapuram">Ramanathapuram</option>
                  </optgroup>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group id="formDescription">
                <Form.Label>Crime Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={crimeDetails.description}
                  onChange={handleInputChange}
                  required
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group id="formEvidence">
                <Form.Label>Evidence</Form.Label>
                <Form.Control
                  type="text"
                  name="evidence"
                  value={crimeDetails.evidence}
                  onChange={handleInputChange}
                  required
                  isInvalid={!!errors.evidence}
                />
                <Form.Control.Feedback type="invalid">{errors.evidence}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group id="formVehicles">
                <Form.Label>Vehicles (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  name="vehicles"
                  value={crimeDetails.vehicles}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group id="formSuspect">
                <Form.Label>Suspect</Form.Label>
                <Form.Control
                  type="text"
                  name="suspect"
                  value={crimeDetails.suspect}
                  onChange={handleInputChange}
                />
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
          <ToastContainer />
        </Modal>
      )}

      {checkStatus && (
        <Modal show={showModal} onHide={() => setShowModal(false)} id="customModal">
          <Modal.Header closeButton>
            <Modal.Title>Complaint status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {status.length === 0 && registeredStatus.length === 0 && solvedStatus.length === 0 && (
              <h4 className='text-secondary'>There are no complaints!</h4>
            )}

            <>
              {status.length > 0 && (
                <div>
                  {status.map((data) => {
                    return (
                      <div key={data.id} className='mt-2'>
                        <div className="row">
                          <div className="col-6">
                            <h5>Complaint Code : </h5>
                          </div>
                          <div className="col-6">
                            <h5>{data.complaintCode}</h5>
                          </div>

                        </div>
                        <div className="row">
                          <div className="col-6">
                            <h5>Status : </h5>
                          </div>
                          <div className="col-6">
                            {data.status === 'Complaint registered' && (
                              <h5 className='text-secondary'>{data.status}</h5>
                            )}
                            {data.status === 'Under Investigation' && (
                              <h5 className='text-danger'>{data.status}</h5>
                            )}
                            {data.status === 'Solved' && (
                              <h5 className='text-success'>{data.status}</h5>
                            )}
                          </div>

                        </div>

                      </div>
                    );
                  })}
                </div>

              )}

              {registeredStatus.length > 0 && (
                <div>
                  {registeredStatus.map((data) => {
                    return (
                      <div key={data.id} className='mt-2'>
                        <div className="row">
                          <div className="col-6">
                            <h5>Complaint Code : </h5>
                          </div>
                          <div className="col-6">
                            <h5 >{data.complaintCode}</h5>

                          </div>

                        </div>
                        <div className="row">
                          <div className="col-6">
                            <h5>Status : </h5>
                          </div>
                          <div className="col-6">
                            {data.status === 'Complaint registered' && (
                              <h5 className='text-secondary'>{data.status}</h5>
                            )}
                            {data.status === 'Under Investigation' && (
                              <h5 className='text-info'>{data.status}</h5>
                            )}
                           
                            {data.status === 'solved' && (
                              <h5 className='text-success'>{data.status}</h5>
                            )}
                          </div>

                        </div>

                      </div>
                    );
                  })}
                </div>

              )}
              {solvedStatus.length > 0 && (
                <div>
                  {solvedStatus.map((data) => {
                    return (
                      <div key={data.id} className='mt-2'>
                        <div className="row">
                          <div className="col-6">
                            <h5>Complaint Code : </h5>
                          </div>
                          <div className="col-6">
                            <h5>{data.complaintCode}</h5>

                          </div>

                        </div>
                        <div className="row">
                          <div className="col-6">
                            <h5>Status : </h5>
                          </div>
                          <div className="col-6">
                            {data.status === 'Complaint registered' && (
                              <h5 className='text-secondary'>{data.status}</h5>
                            )}
                            {data.status === 'Under Investigation' && (
                              <h5 className='text-danger'>{data.status}</h5>
                            )}
                            {data.status === 'Solved' && (
                              <h5 className='text-success'>{data.status}</h5>
                            )}
                          </div>

                        </div>

                      </div>
                    );
                  })}
                </div>

              )}
            </>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>

          </Modal.Footer>
          <ToastContainer />
        </Modal>
      )}
    </>
  );
};

export default ReportCrime;