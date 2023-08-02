import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminLogin() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  }

  //console.log(email)
  useEffect(() => {

    const { email } = location.state || {};
    console.log(email)
    const get_url = `http://localhost:8082/api/getlog/${email}`;

    const getRequest = async () => {

      setIsLoading(true);
      setIsError(false);

        try {
          const response = await fetch(get_url, {
            method: 'GET'
          });

          if (!response.ok) {
            setIsError(true);
          } else {
            const data = await response.json();
            setUser(data);
            console.log(data)
            
          }
        } catch (error) {
          setIsError(true);
          console.log(error);
        }

      setIsLoading(false);
    };

    if(email){
        getRequest();
    }
}, [location]);

// eslint-disable-next-line react-hooks/exhaustive-deps

  if (isLoading) {
    //console.log(email)
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    
    <div className="App" style={{ minHeight: '100vh', backgroundColor: "black", paddingTop: '20px'  }}>
      <header className='App-header'>
        <Container className="mb-3 bg-primary text-black d-flex justify-content-center">
          <h2>Recent Login History</h2>
        </Container>

        <Container className='bg-primary' style={{ paddingTop: '3px'}}>
          {user.map((item) => (
            <div key={item.idLoginLog}>
              
              <h3 className='d-flex justify-content-center'>Login ID: {item.idLoginLog}</h3>
              <h3>IP Address: {item.iP}</h3>
              <h3>Location: {item.location}</h3>
              <h3>Event Time: {item.eventTime}</h3>
              <h3>Staff: {item.adminDTO.email}</h3>   
              <hr></hr> 
            </div>
          ))}
        </Container>

        <Container className='bg-primary d-flex justify-content-center'>
          <Button type='button' className="bg-info my-2 mx-2" onClick={goBack}>ADMIN PORTAL</Button>
        </Container>
        
      </header>
    </div>
  );
}

export default AdminLogin;
