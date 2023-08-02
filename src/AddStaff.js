import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function AddStaff() {

    const navigate = useNavigate();
    const [staffCreated, setStaffCreated] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [staff, setValues] = useState({

        firstName: "",
        middleName: "",
        lastName: "",
        mobile: "",
        email: "",
        authUserDTO: {
            username: "",
            password: "",
            isSuperuser: false,
            isStaff: true,
        },
        addressDTO: {
            buildingNo: "",
            firstLine: "",
            secondLine: "",
            city: "",
            county: "",
            postCode: "",
            //country: "",
        }
    })

    const handleInput = (event) => {

        const { name, value } = event.target;

        if (name.includes('.')) {

            const [parent, child] = name.split('.');

            setValues((prev) => ({...prev, [parent]: { ...prev[parent], [child]: value }}));
        
        } else {

            setValues((prev) => ({
                ...prev, [name]: value
            }));

        }

    }

    // send post request with body to addadmin
    
    const url = `http://localhost:8082/api/addadmin`;

    const handleSubmit = async (event) => {
       // console.log(values)
        event.preventDefault();
        //setErrors(Validation(values));

        setIsLoading(true);
        setIsError(false);

        try {
            console.log(JSON.stringify(staff))
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000', 
                    'Content-Type': 'application/json',
    
                },
                
                body: JSON.stringify(staff)
                
            });
    
            if (!response.ok) {
                
                setIsError(true);
                
            } else {

                const data = await response.json();
                console.log(data)
                
                setStaffCreated(true)
                //navigate('/submitted', { state: { submittedValues: data } });
    
            }
    
            } catch (error) {
    
                setIsError(true);
                console.log(error);
    
            }
    
            setIsLoading(false);

    };

    useEffect(() => {

        if (staffCreated) {

            const timer = setTimeout(() => {
                setStaffCreated(false);
            }, 5000);

            return () => {
                clearTimeout(timer);
            }

        } 

    }, [staffCreated]);

    const goBack = () => {
        navigate(-1);
    }
  
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }

  return (
    <div className='App' style={{ minHeight: '100vh', backgroundColor: "black", paddingTop: '20px', paddingBottom: '20px' }}>
        <header className='App-header'>
        <Container className='bg-primary' style={{ padding: '3px' }}>
            <div className='mx-3 my-3'><h2>Enter new staff details below:</h2></div>
        </Container>
        
        <Container className="my-3 bg-primary">
            <Form onSubmit={handleSubmit}>
            
                <Row>
                    <Col className="mt-3 mx-2" style={{ border: '1px solid', borderRadius: '10px' }}>
                        <Form.Group controlId="formName" className="">
                            <h3>Full Name</h3>
                            <div className='mb-2'>
                                <Form.Label htmlFor="firstName">First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name" name="firstName" onChange={handleInput}/>  
                            </div>

                            <div className='mb-2'>
                                <Form.Label htmlFor="middleName">Middle Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Middle Name" name="middleName" onChange={handleInput}/>  
                            </div>

                            <div className='mb-2'>
                                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" name="lastName" onChange={handleInput}/>  
                            </div>
                        </Form.Group>
                    </Col>

                    <Col className="mt-3 mx-2" style={{ border: '1px solid', borderRadius: '10px' }}>
                        <Form.Group controlId="formContact" className="">
                            <h3>Contact Details</h3>
                            <div className='mb-2'>
                                <Form.Label htmlFor="mobile">Mobile</Form.Label>
                                <Form.Control type="text" placeholder="Enter Mobile Number" name="mobile" onChange={handleInput}/>  
                            </div>

                            <div className='mb-2'>
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" name="email" onChange={handleInput}/>  
                            </div>
                        </Form.Group>
                    </Col>

                    <Col className="mt-3 mx-2" style={{ border: '1px solid', borderRadius: '10px' }}>
                        <Form.Group controlId="formAuthentication" className="">
                            <h3>Authentication Details</h3>
                            <div className='mb-2'>
                                <Form.Label htmlFor="authUserDTO.username">User Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" name="authUserDTO.username" onChange={handleInput}/>  
                            </div>

                            <div className='mb-2'>
                                <Form.Label htmlFor="authUserDTO.password">Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" name="authUserDTO.password" onChange={handleInput}/>  
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className='mx-1 my-3' style={{ border: '1px solid', borderRadius: '10px' }}>
                    <Form.Group controlId="formAddress" className="">
                        <h3>Address</h3>

                        <div>
                            <Form.Label htmlFor="addressDTO.buildingNo">Building No.</Form.Label>
                            <Form.Control className='mb-2' type="text" placeholder="Enter Building Number" name="addressDTO.buildingNo" onChange={handleInput}/>  
                            
                            <Form.Label htmlFor="addressDTO.firstLine">First Line</Form.Label>
                            <Form.Control className='mb-2' type="text" placeholder="Enter First Line" name="addressDTO.firstLine" onChange={handleInput}/>  
                           
                            <Form.Label htmlFor="addressDTO.secondLine">Second Line</Form.Label>
                            <Form.Control className='mb-2' type="text" placeholder="Enter Second Line" name="addressDTO.secondLine" onChange={handleInput}/>  
                           
                            <Form.Label htmlFor="addressDTO.city">City</Form.Label>
                            <Form.Control className='mb-2' type="text" placeholder="Enter City" name="addressDTO.city" onChange={handleInput}/>  
                           
                            <Form.Label htmlFor="addressDTO.county">County</Form.Label>
                            <Form.Control className='mb-2' type="text" placeholder="Enter County" name="addressDTO.county" onChange={handleInput}/>  
                           
                            <Form.Label htmlFor="addressDTO.postCode">Post Code</Form.Label>
                            <Form.Control className='mb-2' type="text" placeholder="Enter Post Code" name="addressDTO.postCode" onChange={handleInput}/>                            

                            {/* <label htmlFor="country">Country</label>
                            <input type="text" placeholder="Enter Country" name="country" 
                            onChange={handleInput} /> */}
                            
                        </div>
                    </Form.Group>

                </Row>         

                <div className='d-flex justify-content-center'>
                    <Button type='submit' className='bg-info mb-3'>Create Admin User</Button>
                </div>
                <h1>{staffCreated && "Staff member created successfully!"}</h1>
            </Form>
        </Container>

        <Container className='bg-primary d-flex justify-content-center'>
            <Button className='bg-info my-3 mx-3' onClick={goBack}>ADMIN PORTAL</Button>
        </Container>
        </header>
    </div>
  )
}

export default AddStaff