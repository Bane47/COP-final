import React from 'react';
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const role = localStorage.getItem('role');
  const userName = localStorage.getItem('userName');

  return (
    <div className='sidebar'> 
      <div id="nav-bar">
        <input id="nav-toggle" type="checkbox" />
        <div id="nav-header"><a id="nav-title"  target="_blank"><h6>Welcome {userName}!</h6></a>
          <hr />
        </div>
        <div id="nav-content">
          {role === "Admin" && (
            <div class="nav-button p-2"><i class="fas fa-palette"></i><span>
              <Link to='/register-police'>Police Registration</Link>
            </span>
            </div>
          )}
           {role === "Inspector" && (
            <>
            <div class="nav-button p-2">
              <span>
              <Link to='/InspectorComplaints' >Complaints</Link>
            </span>
            </div>
            <div class="nav-button p-2">
              <span>
              <Link to='/Fir'>First-Information-Reports</Link>
            </span>
            </div>
            </>
          )}
          <div id="nav-content-highlight"></div>
        </div>
        <input id="nav-footer-toggle" type="checkbox" />
        <div id="nav-footer">
          <div id="nav-footer-heading">
            <div id="nav-footer-avatar"><img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" /></div>
            <div id="nav-footer-titlebox"><a id="nav-footer-title" href="https://codepen.io/uahnbu/pens/public" target="_blank">uahnbu</a><span id="nav-footer-subtitle">Admin</span></div>
            <label for="nav-footer-toggle"><i class="fas fa-caret-up"></i></label>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Sidebar
