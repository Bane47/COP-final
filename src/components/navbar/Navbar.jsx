import '../styles/Navbar.css'
import { Link } from 'react-router-dom';

function MyNavbar() {

  return (
    <div >
      <nav class="navbar navbar-expand-lg bg-black px-0 py-2 fixed-top ">
        <div class="container">
     
          <Link className='text-decoration-none  nav-item nav-link mx-2' to='/'><h3 className='text-white'>COP</h3></Link>
     
          <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
            aria-label="Toggle navigation">
            <i class="fa-solid fa-bars-staggered"></i>            </button>

          <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav mx-lg-auto" id="top">


            </div>
            <div class="navbar-nav ms-lg-4" id="right">
            </div>
            <div class="d-flex align-items-lg-center mt-3 mt-lg-0">
            
                <>
                <Link className='border-0  text-decoration-none nav-item nav-link mx-2' to="/officersDashboard" >officers </Link>

                  <Link className='border-0  text-decoration-none nav-item nav-link mx-2' to="/register" >Register </Link>
                  <Link className='border-0  text-decoration-none nav-item nav-link mx-2' to="/dashboard" >Dashboard </Link>

                  <Link className='text-decoration-none border-0  nav-item nav-link mx-2' to="/login" > Login</Link>
                </>
          
            
            
            </div>
          </div>
        </div>
      </nav>

    </div>
  );
}

export default MyNavbar;