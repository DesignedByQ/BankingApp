import React, { useState, useEffect } from 'react'
import CodeValidation from './TwoFACodeVerification';
import { Link, useLocation,  useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TwoFACode() {

  const [values, setValues] = useState({
    code: '',
  });

  const location = useLocation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(CodeValidation(values));
  };

  const email = location.state ? location.state.email : ''; 

  const url = `http://localhost:8080/api/emails/${email}/codes/${values.code}`;

  const admin_url = `http://localhost:8082/api/emails/${email}/codes/${values.code}`;
  
  useEffect(() => {
   
    const putRequest = async (email) => {
      
      setIsLoading(true);
      setIsError(false);
      
      const eml = email.substring(email.length - 12)

      //console.log(eml)

      try {

        if(eml !== "@infosys.com") {

          const response = await fetch(url, {
            method: 'PUT'
          });
        
          if (!response.ok) {
            
            setIsError(true);
            console.log(response)
            
          } else {
            //console.log(response.json)
            navigate('/custprofile', { state: { email: email } } );

          }

        } else if (eml === "@infosys.com") {

          const response = await fetch(admin_url, {
            method: 'PUT'
          });
        
          if (!response.ok) {
            
            setIsError(true);
            
          } else {
            //console.log(response.json)
            navigate('/adminportal', { state: { email: email } } );

          }

        }

      } catch (error) {

        setIsError(true);
        console.log(error);

      }

      setIsLoading(false);

    };

    if (errors.code === "") {
      putRequest(email);
    }

  }, [admin_url, email, url, location.state, errors.code, navigate]);

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: "black", paddingTop: '20px', paddingBottom: '20px'  }}> 
      <header className='App-header'>
        <Container className='bg-primary d-flex justify-content-center'>
      <div>
        {isLoading && <h2>Code verification successful! Logging in to user profile...</h2>}
        {isError && <h2>The code provided could not be verified</h2>}
        <h2 className='my-3'>CODE VERIFICATION</h2>
        <Form onSubmit={handleSubmit}>
          <div>
            <Form.Group controlId='formCode'>
              <Form.Label className='d-flex justify-content-center' htmlFor="code">Code: </Form.Label>
              <Form.Control 
            
              type="number"
              placeholder="Enter Code"
              name="code"
              onChange={handleInput}
            />
            <Form.Text>{errors.code && <span>{errors.code}</span>}</Form.Text>
            
            </Form.Group>
          </div>
        
          <Button type="submit" className="my-3 mx-3 bg-info">SUBMIT CODE</Button>
          <Button className="my-3 mx-3 bg-info" type="submit" ><Link to="/" className="">HOMEPAGE</Link></Button>

        </Form>
      </div>
      </Container>
      </header>
    </div>
  );
}


export default TwoFACode;