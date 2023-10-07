import React, { useEffect, useState } from 'react';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';
import { useNavigate } from 'react-router';
import ComplaintCodeModal from '../model/complaintCodeModel';


const ComplainantForm = () => {
    const [loading, setLoading] = useState(true);
    const userDetails = useSelector((state) => state.userDetails);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [compCode, setComplaintCode] = useState();
    const [step, setStep] = useState(1);
    const history = useNavigate();
    const [formData, setFormData] = useState({
        crimeType: '',
        complaintDescription: '',
        incidentDate: '',
        incidentLocation: '',
        incidentDescription: '',
        witnessName: '',
        witnessContact: '',
        witnessAddress: '',
        witnessStatement: '',
        additionalDetails: '',
        evidenceFile: null,
        stationCode: 0,
        inspector: ''
    });
    var complaintCode;
    const [image, setImage] = useState();
   
    const [zones, setZones] = useState([]);
    const [crimeTypes, setCrimeTypes] = useState([]);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    //Generating the complaint code
    const generateCode = (location, stationCode) => {
        complaintCode = location + stationCode + Math.floor(Math.random() * 10000);
    }
    useEffect(() => {
        // Simulate loading for 2 seconds
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    const handleImageUpload = (event) => {
        const selectedFile = event.target.files[0];
    
        if (selectedFile) {
          convertImageToBase64(selectedFile, (data) => {
            setImage(data);
            console.log('Base64 data:', data);
            // You can use the base64Data state here as needed (e.g., send it to a server, display it, etc.)
          });
        }
      };

      const convertImageToBase64 = (imageFile, callback) => {
        const reader = new FileReader();
    
        // Set up a callback function to handle the file reading
        reader.onload = () => {
          const base64Data = reader.result.split(',')[1]; // Extract the base64 data from the result
          callback(base64Data);
        };
    
        // Read the image file as a Data URL
        reader.readAsDataURL(imageFile);
      };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const complainantData = { ...formData };
        generateCode(formData.incidentLocation, formData.stationCode)
        // You can now send the complainantData to your server/API
        const reportTime = new Date();
        const year = reportTime.getFullYear();
        const month = reportTime.getMonth() + 1; // Adding 1 because months are zero-based (0 = January)
        const day = reportTime.getDate();
        const hours = reportTime.getHours();
        const minutes = reportTime.getMinutes();

        await axios.post('http://localhost:3001/post-crimes', {
            crimeType: formData.crimeType,
            complaintDescription: formData.complaintDescription,
            incidentDate: formData.incidentDate,
            incidentLocation: formData.incidentLocation,
            stationCode: formData.stationCode,
            incidentDescription: formData.incidentDescription,
            evidenceFile: image,
            witnessStatement: formData.witnessStatement,
            witnessContact: formData.witnessContact,
            witnessAddress: formData.witnessAddress,
            additionalDetails: formData.additionalDetails,
            witnessName: formData.witnessName,
            contact: userDetails.contact,
            userEmail: userDetails.email,
            userName: userDetails.name,
            reportedAt: `${day}-${month}-${year}`,
            reportedTime: `${hours}:${minutes}`,
            status: 'Complaint Registered',
            complaintCode,
            inspector: formData.inspector
        })
            .then(() => {
                setShowModal(true);
                setComplaintCode(complaintCode);
            })
            .catch((error) => {
                console.log(error)
            })


    };


    const getZonesAndCrimeTypes = () => {
        axios.get('http://localhost:3001/all-zones')
            .then((res) => {
                setZones(res.data);
            });
        axios.get('http://localhost:3001/get-crimetype')
            .then((res) => {
                setCrimeTypes(res.data);
            });
    };
    useEffect(() => {
        getZonesAndCrimeTypes();
    }, []);
    const updateFormData = (field, value) => {
        if (field === 'incidentLocation') {
            // Find the corresponding zone object for the selected location
            const selectedZone = zones.find((zone) => zone.area === value);
            if (selectedZone) {
                // Set the incidentLocation and stationCode in the form data
                setFormData({
                    ...formData,
                    incidentLocation: value,
                    stationCode: selectedZone.stationCode,
                    inspector: selectedZone.inspector
                });
            }
        } else if (field === 'incidentDate') {
            const currentDate = new Date(); // Get the current date
            const selectedDate = new Date(value); // Convert the entered date to a Date object

            // Check if the selected date is in the future
            if (selectedDate > currentDate) {
                // You can display an error message or handle the validation as needed
                alert('Future date not allowed');
            } else {
                // Update the form data when it's a valid date
                setFormData({
                    ...formData,
                    [field]: value,
                });
            }
        } else {
            // For other fields, update the form data as usual
            setFormData({
                ...formData,
                [field]: value,
            });
        }
    };
 


    return (
        <>
            {loading ? (
                <>
                    <div className='mt-5 pt-5'>
                        <Skeleton width="100%" height="150px"></Skeleton>
                        <div className="flex justify-content-between mt-3">
                            <div className='row'>
                                <div className='text-start col-6'>
                                    <Skeleton width="4rem" height="2rem"></Skeleton>
                                </div>
                                <div className='text-end col-6'>
                                    <Skeleton width="4rem" height="2rem"></Skeleton>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (


                <div className='mt-5'>
                    <div className='mt-5'>
                        <form onSubmit={handleSubmit} >
                            {step === 1 && (
                                <>
                                    <h2>Crime Description</h2>
                                    <div className='row my-2 mt-4 justify-content-center'>
                                        <div className='col-md-8'>
                                            <div className="card p-5">
                                                <div className="row d-flex flex-row align-items-center justify-content-center">
                                                    <div className="col-md-4 text-start">
                                                        <label htmlFor="complaintDescription">Crime Type:</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Form.Select aria-label="Default select example" className='w-100 shadow-none shadow-none mt-1'
                                                            value={formData.crimeType}
                                                            onChange={(e) => updateFormData('crimeType', e.target.value)}>
                                                            <option >Select the crime type</option>
                                                            {crimeTypes && (
                                                                <>
                                                                    {crimeTypes.map((data) => (
                                                                        <option key={data._id} value={data.crimeType}>
                                                                            {data.crimeType}
                                                                        </option>
                                                                    ))}
                                                                </>
                                                            )}
                                                            <option value="other">Other</option>

                                                        </Form.Select>
                                                    </div>
                                                </div>


                                                <div className="row d-flex align-items-center justify-content-center">
                                                    <div className="col-md-4 text-start">
                                                        <label htmlFor="complaintDescription" className='mt-2'>Complaint Description:</label></div>

                                                    <div className='col-md-6 mt-2'>
                                                        <InputTextarea
                                                            className='w-100 shadow-none shadow-none'
                                                            id="complaintDescription"
                                                            value={formData.complaintDescription}
                                                            onChange={(e) => updateFormData('complaintDescription', e.target.value)}
                                                            required
                                                        ></InputTextarea>
                                                    </div></div> <div className='row'>

                                                    <div className='col-12 mt-3'>
                                                        <button type="button" onClick={handleNext} className='btn btn-primary'>Next</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <h2>Incident Details</h2>
                                    <div className='row justify-content-center'>
                                        <div className="col-md-8">
                                            <div className="card p-5">
                                                <div className='row my-2 mt-4'>
                                                    <div className="col-md-6 text-start">
                                                        <label htmlFor="incidentDate">Incident Date:</label>  </div>
                                                    <div className='col-md-6 text-start'>
                                                        <InputText
                                                            type="date" className='w-100 shadow-none'
                                                            id="incidentDate"
                                                            variant="outlined"
                                                            value={formData.incidentDate}
                                                            onChange={(e) => updateFormData('incidentDate', e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row my-2 align-items-center'>
                                                    <div className="col-md-6 text-start">
                                                        <label htmlFor="incidentLocation">Incident Location:</label>  </div>
                                                    <div className='col-md-6 text-start'>
                                                        <Form.Select
                                                            aria-label="Default select example"
                                                            id="incidentLocation"
                                                            className='shadow-none'
                                                            value={formData.incidentLocation}
                                                            onChange={(e) => updateFormData('incidentLocation', e.target.value)}
                                                            required
                                                        >
                                                            <option>Select the area</option>
                                                            {zones && zones.map((data) => (
                                                                <option key={data._id} value={data.area}>
                                                                    {data.area}
                                                                </option>
                                                            ))}
                                                        </Form.Select>

                                                    </div>
                                                </div>
                                                <div className='row my-2 align-items-center'>
                                                    <div className="col-md-6 text-start">
                                                        <label htmlFor="incidentDescription">Incident Description:</label>  </div>
                                                    <div className='col-md-6 text-start'>
                                                        <InputTextarea autoResize
                                                            id="incidentDescription" className='w-100 shadow-none'
                                                            value={formData.incidentDescription}
                                                            onChange={(e) => updateFormData('incidentDescription', e.target.value)}
                                                            required
                                                        ></InputTextarea>
                                                    </div>
                                                </div>
                                                <div className='row mt-3'>
                                                    <div className='col-6'>
                                                        <button type="button" onClick={handlePrev} className='btn btn-secondary'>Previous</button>
                                                    </div>
                                                    <div className='col-6'>
                                                        <button type="button" onClick={handleNext} className='btn btn-primary'>Next</button>
                                                    </div>
                                                </div>
                                            </div></div></div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <h2>Witness Information - Optional</h2>
                                    <div className='row justify-content-center'>
                                        <div className="col-md-8">
                                            <div className="card p-5">
                                                <div className='row my-2 mt-4 align-items-center'>
                                                    <div className="col-md-6 text-start">
                                                        <label htmlFor="witnessName" >Witness Name:</label></div>
                                                    <div className='col-md-6 text-start'>
                                                        <InputText
                                                            type="text"
                                                            className='w-100 shadow-none'
                                                            id="witnessName"
                                                            value={formData.witnessName}
                                                            onChange={(e) => updateFormData('witnessName', e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row my-2 align-items-center'>
                                                    <div className='col-md-6 text-start'>
                                                        <label htmlFor="witnessContact" >Witness Contact Number:</label></div>
                                                    <div className='col-md-6 text-start'>
                                                        <InputText
                                                            type="tel"
                                                            className='w-100 shadow-none'
                                                            id="witnessContact"
                                                            value={formData.witnessContact}
                                                            onChange={(e) => updateFormData('witnessContact', e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row my-2 align-items-center'>
                                                    <div className='col-md-6 text-start'>
                                                        <label htmlFor="witnessAddress" >Witness Address:</label></div>
                                                    <div className='col-md-6 text-start'>
                                                        <InputTextarea autoResize
                                                            className='w-100 shadow-none'
                                                            id="witnessAddress"
                                                            value={formData.witnessAddress}
                                                            onChange={(e) => updateFormData('witnessAddress', e.target.value)}
                                                            required
                                                        ></InputTextarea>
                                                    </div>
                                                </div>
                                                <div className='row my-2 align-items-center'>
                                                    <div className='col-md-6 text-start'>
                                                        <label htmlFor="witnessStatement" >Witness Statement:</label></div>
                                                    <div className='col-md-6 text-start'>
                                                        <InputTextarea
                                                            className='w-100 shadow-none'
                                                            id="witnessStatement"
                                                            value={formData.witnessStatement}
                                                            onChange={(e) => updateFormData('witnessStatement', e.target.value)}
                                                            required
                                                        ></InputTextarea>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <button type="button" onClick={handlePrev} className='btn btn-secondary'>Previous</button>
                                                    </div>
                                                    <div className='col-6'>
                                                        <button type="button" onClick={handleNext} className='btn btn-primary'>Next</button>
                                                    </div>
                                                </div> </div> </div> </div>
                                </>
                            )}


                            {step === 4 && (
                                <>
                                    <h2>Additional Details & Evidence</h2>
                                    <div className='row justify-content-center'>
                                        <div className="col-md-8">
                                            <div className="card p-5">
                                                <div className='row my-2 mt-4 align-items-center'>
                                                    <div className="col-md-6 text-start">
                                                        <label htmlFor="additionalDetails" >Additional Details:</label></div>
                                                    <div className='col-md-6 text-start'>
                                                        <InputTextarea
                                                            className='w-100 shadow-none'
                                                            id="additionalDetails"
                                                            value={formData.additionalDetails}
                                                            onChange={(e) => updateFormData('additionalDetails', e.target.value)}
                                                            required
                                                        ></InputTextarea>
                                                    </div>
                                                </div>
                                                <div className='row my-2 align-items-center'>
                                                    <div className="col-md-6 text-start">
                                                        <label htmlFor="evidence" >Evidence:</label></div>
                                                    <div className='col-md-6 text-start'>
                                                        <input
                                                            className='w-100 shadow-none'
                                                            type="file"
                                                            id="evidence"
                                                            name="evidenceFile"
                                                            onChange={handleImageUpload} 
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row mt-3'>
                                                    <div className='col-6'>
                                                        <button type="button" onClick={handlePrev} className='btn btn-secondary'>Previous</button>
                                                    </div>
                                                    <div className='col-6'>
                                                        <button type="submit" className='btn btn-primary'>Submit</button>
                                                    </div>
                                                </div> </div> </div> </div>
                                </>
                            )}

                        </form>
                    </div>

                    {showModal && (
                        <ComplaintCodeModal
                            show={showModal}
                            onHide={() => { setShowModal(false); history('/civilian-dashboard'); }} // Function to hide the modal
                            complaintCode={compCode}
                        />
                    )}
                </div >
            )}
        </>
    );
};

export default ComplainantForm;
