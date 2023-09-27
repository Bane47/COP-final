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


function App() {
  const isLogged = true;
  const role = 'Admin'

  return (
    <div className="App">
      <BrowserRouter>
      
          <MyNavbar />
        <div className='row container'>

          {isLogged ? (
            <>
            
                <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/reportCrime' element={<ReportCrime />} />
                <Route path='/officersDashboard' element={<OfficerDashboard />} />
                <Route path='/firs' element={<Reports />} />

                  {/* <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/phones' element={<Phones />} />
                    <Route path='/dashboard' element={<UserDashBoard />} />
                    <Route path='/*' element={<ErrorPage />} /> */}


                  {role === "Admin" && (
                    <>
                      {/* <Route path='/manage' element={<Manage />} />
                        <Route path='/addphones' element={<AddPhone />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/AdminFeedBack' element={<AdminFeedBack />} /> */}

                    </>
                  )}

                  {role === "User" && (
                    <>
                      {/* <Route path='/feedback' element={<Feedback />} />                       */}
                    </>
                  )}
                  {/* <Route path='/profile' element={<Profile />} />
                    <Route path='/ForgotPassword' element={<ForgotPassword />} />
                    <Route path='/password-reset/:id/:token' element={<ResetPassword />} /> */}

                </Routes>
            </>
          )
            : (<>
              <div className='col-12 col-sm-12 mt-5 pt-5 min-vh-100 overflow-hidden '>
                <Routes>
                  {/* <Route path='/' element={<Home />} />
                    <Route path='/dashboard' element={<ErrorPage />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/ForgotPassword' element={<ForgotPassword />} />
                    <Route path='/password-reset/:id/:token' element={<ResetPassword />} />
                    <Route path='/*' element={<ErrorPage />} /> */}

                </Routes>
              </div></>)}


        </div>


      </BrowserRouter>
      
    </div>
  );
}

export default App;
