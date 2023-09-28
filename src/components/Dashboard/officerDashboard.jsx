import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const OfficerDashboard = () => {
  return (
    <div className="mt-5">
    <div className='mt-5'>
        <Card>
          <Card.Body>
            <h2>Look at the crime reports!</h2>
            <Link to='/firs'><Button>Click</Button></Link>
          </Card.Body>
        </Card>
    </div>
    </div>
  )
}

export default OfficerDashboard