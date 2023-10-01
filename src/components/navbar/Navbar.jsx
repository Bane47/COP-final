import '../styles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom';

// function MyNavbar() {



//   return (
//     <div >
//       <nav class="navbar navbar-expand-lg bg-black px-0 py-2 fixed-top ">
//         <div class="container">

//           <Link className='text-decoration-none  nav-item nav-link mx-2' to='/'><h3 className='text-white'>COP</h3></Link>

//           <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse"
//             data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
//             aria-label="Toggle navigation">
//             <i class="fa-solid fa-bars-staggered"></i>            </button>

//           <div class="collapse navbar-collapse" id="navbarCollapse">
//             <div class="navbar-nav mx-lg-auto" id="top">


//             </div>
//             <div class="navbar-nav ms-lg-4" id="right">
//             </div>
//             <div class="d-flex align-items-lg-center mt-3 mt-lg-0">

//                 <>

//                 </>
//                 {isLogged ? (
//           <button className='btn  nav-item nav-link' onClick={handleLogout} >Logout</button>
//           ):(
//             <>
//             <Link className='border-0  text-decoration-none nav-item nav-link mx-2' to="/officersDashboard" >officers </Link>

//                   <Link className='border-0  text-decoration-none nav-item nav-link mx-2' to="/register" >Register </Link>
//                   <Link className='border-0  text-decoration-none nav-item nav-link mx-2' to="/dashboard" >Dashboard </Link>

//                   <Link className='text-decoration-none border-0  nav-item nav-link mx-2' to="/login" > Login</Link>
//                   </>
//           )}

//             </div>
//           </div>
//         </div>
//       </nav>

//     </div>
//   );
// }

// export default MyNavbar;



import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
function MyNavbar() {
  const isLogged = localStorage.getItem('loggedUser');
  const userRole = localStorage.getItem('role');
  const [data,setData]= useState();
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('role')
    localStorage.removeItem('userName')
    history('/login');
    window.location.reload();
  }
  const fetchData=()=>{
    
    axios.get(`http://localhost:3001/get-profile?email=${isLogged}`)
    .then((res)=>{
      setData(res.data);
      console.log(res.data);
    })
    .catch((err)=>{
      console.error(err)
    })
  }

  useEffect(()=>{
    fetchData();
  },[isLogged])


  return (

    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" fixed="top">
      <Container>
        <Navbar.Brand >COP</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">


          </Nav>
          <Nav>
            {userRole === "officer" ? (
              <>

                <NavLink className='mx-2 text-decoration-none nav-link' to="/dashboard">Dashboard</NavLink >
              </>
            ) : (
              <>

                <NavLink className='mx-2 text-decoration-none nav-link' to="/dashboard">Dashboard</NavLink >

              </>
            )}


            {isLogged ? (
              <>

                <NavLink className='mx-2 text-decoration-none nav-link ' onClick={handleLogout}>Logout</NavLink >
              </>
            ) : (
              <>
                <NavLink className='mx-2 text-decoration-none nav-link' to="/register">Register</NavLink >
                <NavLink className='mx-2 text-decoration-none nav-link' to="/login">Login</NavLink >
              </>
            )}
{/* <img src={`http://localhost:3001/images/${data.image}`}
                className="rounded-circle mt-2 me-2 ms-3 "
                id="avatar"
                alt="Avatar"
                width="40"
                height="40"
              /> */}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;