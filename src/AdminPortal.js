import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminPortal() {

    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
      
    const { email } = location.state || {};  

    const admin_url = `http://localhost:8082/api/getadmin/${email}`;

    useEffect(() => {
      
      const getRequest = async () => {
  
        setIsLoading(true);
        setIsError(false);
  
        try {
            const response = await fetch(admin_url, {
              method: 'GET'
            });
  
            if (!response.ok) {
              setIsError(true);
            } else {
              const data = await response.json();
              setUser(data);
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

}, [email, admin_url]);

    // start = () => {
      
    // }
  
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }

    const getLog = async () => {
      navigate('/adminlogin', { state: { email: email } });
    }

  return (
    <div className='App' style={{ minHeight: '100vh', backgroundColor: "black", paddingTop: '20px', paddingBottom: '20px' }}>
      <header className="App-header">
        <Container className="bg-primary text-black d-flex justify-content-center rounded-pill">

          <Row>
            <Col className="my-3 mx-3 d-flex justify-content-start">
              <div><h5>Staff ID: {user.idAdmin}</h5></div>
            </Col>

            <Col className="my-3" style={{ width: '1000px' }}>
              <div className="d-flex justify-content-center"><h1>Welcome {user.firstName}</h1></div>
            </Col>

            <Col className="my-3 mx-3 d-flex justify-content-end">
              <div><h5>Position: {user.authUserDTO.jobRole.toUpperCase()}</h5></div>
            </Col>
          </Row>
    
        </Container>

        <Container className="my-3 bg-primary text-black d-flex justify-content-center">    
          <Row className='my-3'>
            <div>
              <h1 className="d-flex justify-content-center">Your Admin Details</h1>
              <h3>Full Name: {user.firstName} {user.middleName} {user.lastName}</h3>
              <h3>Mobile: {user.mobile}</h3>
              <h3>Email: {user.email}</h3>
              <h3>Address: {user.addressDTO.buildingNo}, {user.addressDTO.firstLine}, {user.addressDTO.secondLine}, {user.addressDTO.city}, {user.addressDTO.county}, {user.addressDTO.postCode}</h3>
      
              <h3>Staff Since: {user.staffSince}</h3>
            </div>
          </Row>
        </Container>
        
        <Container className='bg-primary text-black d-flex flex-column align-items-center'>
        
          <div className='my-3'><h1>What would you like to do today?</h1></div>

          <div className='my-2'><Button type='type' className="bg-info" onClick={() => navigate("/verifyaccounts")}>Verify Accounts</Button></div>

          <div className='my-2'><Button type='button' className="bg-info" onClick={() => navigate("/addstaff")}>Add Staff</Button></div>

          <div className='my-2'><Button type='button' className="bg-info" onClick={() => navigate("/editcust")}>View & Edit Customer Details</Button></div>

          <div className='my-2'><Button type='button' className="bg-info" onClick={getLog}>Login Log</Button></div>

          <div className='my-2'><Button type='button' className="bg-info" onClick={() => navigate("/adminpayments")}>Process Payments</Button></div>
      
          <div className='mt-2 mb-3'><Button type='button' className="bg-info" onClick={() => navigate("/")}>Log Out</Button></div>
           
        </Container>

      </header>
    </div>
  )
}

export default AdminPortal

