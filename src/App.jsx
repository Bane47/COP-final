import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/navbar/Navbar';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import Dashboard from './components/Dashboard/dashboard';
import Footer from './components/footer/Footer';
import ReportCrime from './components/Report/reportCrime';
import OfficerDashboard from './components/Dashboard/officerDashboard';
import Reports from './components/Report/reports';
import RegisteredFirs from './components/Report/registeredFirs';
import ForgotPassword from './components/forgotPassword/forgetPassword';
import ResetPassword from './components/resetPassword/ResetPassword';


function App() {
  const isLogged = localStorage.getItem('loggedUser');
  const role = localStorage.getItem('role')

  return (
    <div className="App">
      <BrowserRouter>

        <MyNavbar />
        <div className="container">
          <div className='row' id='main-app'>

            {isLogged ? (
              <>
               
                <Routes>
                  <Route path='/reportCrime' element={<ReportCrime />} />

                  {role === 'officer' && (
                    <>
                      <Route path='/dashboard' element={<OfficerDashboard />} />
                      <Route path='/firs' element={<Reports />} />
                      <Route path='/registeredFirs' element={<RegisteredFirs />} />

                    </>
                  )}
                  {role === "civilian" && (
                    <Route path='/dashboard' element={<Dashboard />} />
                  )}

                </Routes>
              </>
            )
              : (<>
                <div className='col-12 col-sm-12 mt-5 pt-5 min-vh-100 overflow-hidden '>
                  <Routes>
                  <Route path='/forgetpassword' element={<ForgotPassword />} />
                  <Route path='/password-reset/:id/:token' element={<ResetPassword />} />

                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/dashboard' element={<Dashboard />} />

                   

                  </Routes>
                </div></>)}


          </div></div>


      </BrowserRouter>

    </div>
  );
}

export default App;
