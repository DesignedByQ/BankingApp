import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Validation from "./LoginValidation";
import {Button, Form, Container, Row, Col, Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    console.log(111)
    event.preventDefault();
    setErrors(Validation(values));
  };

  const url = `http://localhost:8080/api/emails/${values.email}/password/${values.password}/2fa`;

  const admin_url = `http://localhost:8082/api/emails/${values.email}/password/${values.password}/2fa`;

  useEffect(() => {
    
    const putRequest = async () => {

      setIsLoading(true);
      setIsError(false);

      const emails = values.email
      
      const eml = emails.substring(emails.length - 12)

      console.log(eml)

        try {

          if(eml !== "@infosys.com") {

            const response = await fetch(url, {
              method: 'PUT'
            });

            if (!response.ok) {
            
              setIsError(true);
              
            } else {
  
              navigate('/twofacode', { state: { email: values.email } });
  
            }

          } else if (eml === "@infosys.com"){

            const response = await fetch(admin_url, {
              method: 'PUT'
            });

            if (!response.ok) {
            
              setIsError(true);
              
            } else {
  
              navigate('/twofacode', { state: { email: values.email } });
  
            }

          }

        } catch (error) {

          setIsError(true);
          console.log(error);

        }

      setIsLoading(false);

    };

    if (errors.email === "" && errors.password === "") {
      putRequest();
    }

  }, [errors.email, errors.password, values.email, navigate, url, admin_url]);

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: "black", paddingTop: '20px'  }}>
      <header className="App-header">
        <Container className="bg-primary text-black d-flex justify-content-center">

      <div>
        {isLoading && <h2>Logging in...</h2>}
        {isError && <h2>There is no account with those credentials</h2>}
        <Row className="">
            <Col className="mt-3">
              <div className="d-flex justify-content-center">
              <h1>INFOSYS BANK</h1>
              </div>
            
            <h3>Sign-IN</h3>
            </Col>
          </Row>
        
        <Form onSubmit={handleSubmit}>
            <Row >
              <Col className="">
              <Form.Group controlId="formEmail" className="">
                <Form.Label htmlFor="email">Email</Form.Label>
                  <div className="d-flex justify-content-center">
                    <Form.Control style={{ width: '400px' }} type="email" placeholder="Enter your email" name="email" onChange={handleInput} />
                  </div>
                  <Form.Text className="text-muted">
                  {errors.email && <span>{errors.email}</span>}
                  </Form.Text>
                </Form.Group>
              </Col>
           
              <Col>
              <Form.Group controlId="formPassword">
                <Form.Label htmlFor="password">Password</Form.Label>
                  <div className="d-flex justify-content-center">
                    <Form.Control style={{ width: '400px' }} type="password" placeholder="Enter your password" name="password" onChange={handleInput} />
                  </div>
                  <Form.Text className="text-muted">
                  {errors.password && <span>{errors.password}</span>}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          
          <Row className="">
            <Col className="my-3 ">
              <Button type="submit" className="bg-info">LOGIN</Button>
            </Col>
          </Row>

          </Form>
      </div>
      </Container>
      <Container className="d-flex justify-content-center" style={ {paddingTop: '10px'} } >
        <Card className="mx-5 text-center">
              <Card.Img src="data:image/jpeg;base64,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" />
              <Card.Body>
                <Card.Title>
                <p>New Customers</p>
                </Card.Title>
                <Card.Text>
                <p>Register for a new bank account</p>
                </Card.Text>
                <Row className="">
                  <Col className="">
                    <Button type="button" className="bg-info text-white mb-3"> 
                      <Link to="/signup">
                        Start Application
                      </Link>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
      </header>
    </div>
  );
}

export default Login;
