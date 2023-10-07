import '../styles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/Logo.png'
function MyNavbar() {
  const isLogged = localStorage.getItem('loggedUser');
  const userRole = localStorage.getItem('role');
  const [data, setData] = useState();
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('role')
    localStorage.removeItem('userName')
    history('/login');
    window.location.reload();
  }
  const fetchData = () => {

    // axios.get(`http://localhost:3001/get-profile?email=${isLogged}`)
    // .then((res)=>{
    //   setData(res.data);
    //   console.log(res.data);
    // })
    // .catch((err)=>{
    //   console.error(err)
    // })
  }

  useEffect(() => {
    fetchData();
  }, [isLogged])


  return (

    <Navbar collapseOnSelect expand="lg" className='navbar-color' fixed="top">
      <Container>
      <NavLink className='mx-2 text-decoration-none nav-link nav-txt '><img src={logo} className='logo-img' alt="" /></NavLink >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='shadow-none ' />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>

            {userRole === "civilian" && (
              <>
                <NavLink className='mx-2 text-decoration-none nav-link nav-txt' to="/civilian-dashboard">Explore</NavLink >
              </>
            )}
            {userRole === "Admin" && (
              <>
                <NavLink className='mx-2 text-decoration-none nav-link nav-txt' to="/register-police">Register Police</NavLink >
                <NavLink className='mx-2 text-decoration-none nav-link nav-txt' to="/dashboard">Home</NavLink >
              </>
            )}
            {userRole === "Inspector" && (
              <>
                <NavLink className='mx-2 text-decoration-none nav-link nav-txt' to="/inspector-Dashboard">Explore</NavLink >
              </>
            )}
            {userRole === "Sub-Inspector" && (
              <>
                <NavLink className='mx-2 text-decoration-none nav-link nav-txt' to="/dashboard">Explore</NavLink >
              </>
            )}


            {isLogged ? (
              <>
                {/* <NavLink className='mx-2 text-decoration-none nav-link ' to='/MostWanted'>MostWanted</NavLink > */}
                <NavLink className='mx-2 text-decoration-none nav-link nav-txt ' onClick={handleLogout}>Logout</NavLink >
              </>
            ) : (
              <>
                <NavLink className='mx-2 text-decoration-none nav-link nav-txt' to="/">Explore</NavLink >
                <NavLink className='mx-2 text-decoration-none nav-link nav-txt' to="/register">Register</NavLink >
                <NavLink className='mx-2 text-decoration-none nav-link nav-txt' to="/login">Login</NavLink >
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