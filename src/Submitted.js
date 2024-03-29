import React from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Button, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Submitted() {

    const location = useLocation();

    const sv = location.state ? location.state.submittedValues: ''; 
   
  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: "black", paddingTop: '20px', paddingBottom: '20px' }}>
      <header className="App-header">
        <Container className="bg-primary">
          <div><h2>Your account has been successfully submitted!</h2></div>
          <h3>A member from or team will have to verify the details you provided along with your proof of ID</h3>

          <h3  className="my-2">Please check your emails in the next 24 hours for notification of our dcision and next steps</h3>

          <h4>Here is a reminder of the details you provided us:</h4>

          <h5><i>Account Requested: {sv.account}</i></h5>

          <h5>Username: {sv.username}</h5>
          <h5>Customer ID: {sv.custid}</h5>
          <h5>Full Name: {sv.firstname} {sv.middlename} {sv.lastname}</h5>
          <h5>Date of Birth: {sv.dob}</h5>
          <h5>Phone: {sv.mobile}</h5>
          <h5>Email: {sv.email}</h5>
          <h5>Address</h5>
          <h5>Building No. {sv.addressDTO["buildingNo"]}</h5>
          <h5>First Line: {sv.addressDTO["firstLine"]}</h5>
          <h5>Second Line: {sv.addressDTO["secondLine"]}</h5>
          <h5>City: {sv.addressDTO["city"]}</h5>
          <h5>County: {sv.addressDTO["county"]}</h5>
          <h5>Post Code: {sv.addressDTO["postCode"]}</h5>
          <h5>Proof of ID</h5>
          <h5>File Name: {sv.fileDTO["fileName"]}</h5>

          <Button type="submit" className="bg-info my-3"><Link to="/" className="link">HOMEPAGE</Link></Button>
        </Container>
      </header>  
    </div>
  )
}

export default Submitted