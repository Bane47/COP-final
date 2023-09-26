import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/navbar/Navbar';
import Register from './components/authentication/Register';


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
              <div className='col-12 col-sm-3 col-lg-2 '>
                {/* <SideBar /> */}
              </div>
              <div className='col-12 col-lg-10 col-md-8 col-sm-7 overflow-hidden mt-5 pt-5 '>
                <Routes>
                <Route path='/register' element={<Register />} />

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
              </div>
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
