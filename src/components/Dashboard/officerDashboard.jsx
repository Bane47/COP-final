import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const OfficerDashboard = () => {
  return (
    <div>
        <Card>
          <Card.Body>
            <h2>Look at the crime reports!</h2>
            <Link to='/firs'><Button>Click</Button></Link>
          </Card.Body>
        </Card>
    </div>
  )
}

export default OfficerDashboard