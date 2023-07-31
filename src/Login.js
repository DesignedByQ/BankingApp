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
        
        <Form action="" onSubmit={handleSubmit} >
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
              <Card.Img src="Frontend\banking-app-frontend\src\Assets\register.jpg" />
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
