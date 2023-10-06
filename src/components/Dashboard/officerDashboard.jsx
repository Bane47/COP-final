import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Skeleton } from 'primereact/skeleton';

const OfficerDashboard = () => {
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mt-5">
      {loading ? (
        <>
          <div className='mt-5'>
            <Card>
              <Card.Body>
                <div className='my-2'>
                <Skeleton height={50} width={200} />
                </div>
                <div className='my-2'>
                <Skeleton height={30} width={300} />
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className='mt-5'>
            <Card>
              <Card.Body>
              <div className='my-2'>
                <Skeleton height={50} width={200} />
                </div>
                <div className='my-2'>
                <Skeleton height={30} width={300} />
                </div>
              </Card.Body>
            </Card>
          </div>
        </>
      ) : (
        <>
          <div className='my-5 shadow-lg '>
            <Card className='border-0'>
              <Card.Body>
                <h2>Look at the crime reports!</h2>
                <Link to='/firs'>
                  <Button>Click</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div className='my-5 shadow-lg'>
            <Card className='border-0'>
              <Card.Body>
                <h2>Look at the overall FIRs!</h2>
                <Link to='/registeredFirs'>
                  <Button>Click</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div className='my-5 shadow-lg'>
            <Card className='border-0'>
              <Card.Body>
                <h2>Updates from the police stations</h2>
                <Link to='/updates'>
                  <Button>Click</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

export default OfficerDashboard;
