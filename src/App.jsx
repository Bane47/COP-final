import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/navbar/Navbar';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import Dashboard from './components/Dashboard/CivilianDashboard';
import Footer from './components/footer/Footer';
import ReportCrime from './components/Report/reportCrime';
import OfficerDashboard from './components/Dashboard/officerDashboard';
import Reports from './components/Report/reports';
import RegisteredFirs from './components/Report/registeredFirs';
import ForgotPassword from './components/forgotPassword/forgetPassword';
import ResetPassword from './components/resetPassword/ResetPassword';
import { useSelector } from 'react-redux';
import ComplainantForm from './components/multistepper/personal-details';
import MostWanted from './components/wantedList/WantedList';
import Sidebar from './components/sidebar/sidebar';
// import RegisterPoliceComponent from './components/authentication/policeAccountCreation';
import MeritList from './components/meritlist/meritlist';
import SubInspectorDashboard from './components/Dashboard/SubInspector';
import InspectorDashboard from './components/Dashboard/InspectorDashboard';
import HomeDashboard from './components/Dashboard/HomeDashboard';
import InspectorComplaints from './components/Inspector/InspectorComplaints';
import FIR from './components/Inspector/FIR';
import SmallNav from './components/navbar/SmallNav';
import Officers from './components/Officers/Officers';



function App() {
  const isLogged = localStorage.getItem('loggedUser');
  const role = localStorage.getItem('role');
  const reduxRole = useSelector((state) => state.userDetails.role);

  return (
    <div className="App">
      <BrowserRouter>

        <MyNavbar />
        <div className="container mt-3">
          <div className='row' id='main-app'>
            
            <div className='col-12 mt-5'>
              <SmallNav></SmallNav>
              {isLogged ? (
              <>
                  <Routes>

                    <Route path='/' element={<HomeDashboard />} />
                    {role === "Admin" && reduxRole === 'Admin' && (
                      <>
                        <Route path='/register-police' element={<MeritList />} />
                        <Route path='/firs' element={<Reports />} />
                        <Route path='/registeredFirs' element={<RegisteredFirs />} />
                        <Route path='/ComplaintForm' element={<ComplainantForm />} />
                        <Route path='/dashboard' element={<OfficerDashboard />} />
                        <Route path='/MostWanted' element={<MostWanted />} />
                        <Route path='/updates' element={<MostWanted />} />
                        <Route path='/officers-page' element={<Officers />} />

                      </>
                    )}
                    {role === 'Inspector' && reduxRole === 'Inspector' && (
                      <>
                        <Route path='/inspector-Dashboard' element={<InspectorDashboard />} />
                        <Route path='/InspectorComplaints' element={<InspectorComplaints />} />
                        <Route path='/Fir' element={<FIR />} />

                      </>
                    )}
                    {role === "civilian" && reduxRole === 'civilian' && (
                      <>
                        <Route path='/ComplaintForm' element={<ComplainantForm />} />
                        <Route path='/civilian-dashboard' element={<Dashboard />} />
                        <Route path='/MostWanted' element={<MostWanted />} />

                      </>
                    )}
                    {role === "Sub-Inspector" && reduxRole === 'Sub-Inspector' && (
                      <>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/MostWanted' element={<MostWanted />} />
                        <Route path='/sub-inspector-dashboard' element={<SubInspectorDashboard />} />
                      </>
                    )}
                  </Routes>
                </>
              ) : (
                <>
                  <div className='col-12 col-sm-12 mt-5 pt-5 min-vh-100 overflow-hidden '>
                    <Routes>
                      <Route path='/' element={<HomeDashboard />} />
                      <Route path='/forgetpassword' element={<ForgotPassword />} />
                      <Route path='/password-reset/:id/:token' element={<ResetPassword />} />
                      <Route path='/register' element={<Register />} />
                      <Route path='/login' element={<Login />} />
                      <Route path='/MostWanted' element={<MostWanted />} />
                    </Routes>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
