import React from 'react';
import '../styles/smallNavbar.css'

const SmallNav = () => {
    const userName = localStorage.getItem('userName');
    return (
        <div className='container-fluid'>
            <div className="row" id='ribbon'>
                <div className="col-12">
                    <p>Welcome {userName}! </p>
                </div>
            </div>
        </div>
    )
}

export default SmallNav