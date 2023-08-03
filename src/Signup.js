import React from 'react'
import Validation from './SignupValidation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {

    const [values, setValues] = useState({
        account: '',
        username: '',
        firstname: '',
        middlename: '',
        dob: '',
        lastname: '',
        mobile: '',
        addressDTO: {buildingNo: '', firstLine: '', secondLine: '', city: '', county: '', postCode: ''},
        fileDTO: {fileName: '', fileType: '', fileData: ''},
        email: '',
        password: '',
        confirmpassword: '',
        approved: false,
        verdict: "TBC",
        
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleInput = (event) => {

        const { name, value, files } = event.target;

        if (name.includes('.')) {

            const [parent, child] = name.split('.');

            setValues((prev) => ({...prev, [parent]: { ...prev[parent], [child]: value }}));
        
        } else {

            setValues((prev) => ({
                ...prev, [name]: value
            }));

        }
        // console.log(values.fileDTO.fileType)
        // console.log(values.fileDTO.fileName)
        // console.log(values.fileDTO.fileData)
        // const fileExtension = values.fileDTO.fileData.split('.').pop().toLowerCase()
        // values.fileDTO.fileType = `"image/${fileExtension}"`
        
        // const fname = values.fileDTO.fileData.split('\\').pop().toLowerCase();
        // values.fileDTO.fileName = fname.split('.').shift().toLowerCase();
        // console.log(values.fileDTO.fileName)
        if (files && files[0]) {
            const reader = new FileReader();
            
            // const fname = values.fileDTO.fileData.split('\\').pop().toLowerCase();
            // values.fileDTO.fileName = fname.split('.').shift().toLowerCase();
            // console.log(1111)
            // console.log(files[0])
            // console.log(files[0].name)
            reader.onload = () => {
                const base64Image = reader.result;

                const base64ImageData = base64Image.split(',').pop()

                setValues((prev) => ({
                    ...prev,
                    fileDTO: { ...prev.fileDTO, fileData: base64ImageData, fileType: files[0].type, fileName: files[0].name },
                    
                }));
            };

            reader.readAsDataURL(files[0]);

        }
        // Read the image file (assuming you have access to the file object)
        // const fileReader = new FileReader();
        // fileReader.noload = function (event) {
        //     const base64Image = event.target.result

        //     values.fileDTO.fileData = base64Image
        // }

        //fileReader.readAsDataURL(`${values.fileDTO.fileData}`)

    }

    const url = `http://localhost:8081/api/uploadcust`;

    const handleSubmit = async (event) => {
       // console.log(values)
        event.preventDefault();
        setErrors(Validation(values));
        // if(errors.name === "" && errors.email === "" && errors.password === "") {
        //     axios.post('')
        // }
        
        if(Object.keys(errors).length === 0) {

            setIsLoading(true);
            setIsError(false);

            try {
                //console.log(JSON.stringify(values))
                const response = await fetch(url, {
                  method: 'POST',
                  headers: {
      
                      'Content-Type': 'application/json',
      
                  },
                  
                  body: JSON.stringify(values)
                  
                });
        
                if (!response.ok) {
                  
                  setIsError(true);
                  
                } else {

                    const data = await response.json();
                    console.log(data)
                    //do get req on submitted page
                  // this page should navigate to a details succeffully submitted page. check your emails within the next 24hrs for a decsion on your account
                    navigate('/submitted', { state: { submittedValues: data } });
        
                }
        
              } catch (error) {
        
                setIsError(true);
                console.log(error);
        
              }
        
              setIsLoading(false);

            }

        };
    
  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: "black", paddingTop: '20px', paddingBottom: '20px' }}>
        <header className='App-header'>
        <div>
        {isLoading && <h2>Submitting details...</h2>}
        {isError && <h2>There has been an error with submitting your details, please try again later</h2>}
        <Container className='bg-primary text-black d-flex justify-content-center'>
            <h2>Sign-Up</h2>
        </Container>

        <Container className='bg-primary my-3'>
            <h2>Enter your details for your new account.</h2>
            <Form onSubmit={handleSubmit}>
                <div style={{ border: '1px solid', borderRadius: '10px', padding: '10px' }}>
                    <fieldset>
                        <legend>Select which account you would like to open:</legend>
                        {errors.account && <span>{errors.account}</span>}
                        <div>
                            <input className='mx-3' type="radio" id="current" name="account" value="current" checked={values.account === "current"} onChange={handleInput}/>
                            <label htmlFor="current">Current Account</label>
                        </div>

                        <div>
                            <input className='mx-3' type="radio" id="savings" name="account" value="savings" checked={values.account === "savings"} onChange={handleInput}/>
                            <label htmlFor="savings">Savings Account</label>
                        </div>

                        <div>
                            <input className='mx-3' type="radio" id="creditcard" name="account" value="creditcard" checked={values.account === "creditcard"} onChange={handleInput}/>
                            <label htmlFor="creditcard">Credit Card</label>
                        </div>
                    </fieldset>
                </div>
                <div className='my-3'>
                    <small>Please insure all details provided match the identification document provided.</small>
                </div>

                <h3>Personal Details</h3>
                
        
                <Form.Group controlId='formPersonal' style={{ border: '1px solid', borderRadius: '10px', padding: '10px' }}>
                <Row>
                <Col>
                <h5>Customer</h5>  
                <div className='my-2'>
                    <Form.Label htmlFor="username">User Name</Form.Label>
                    
                    <Form.Control type="text" placeholder="Enter Username" name="username" 
                    onChange={handleInput} />
                    <Form.Text>
                        {errors.username && <span>{errors.username}</span>}
                    </Form.Text>
                </div>
                <div className='my-2'>
                    <Form.Label htmlFor="firstname">First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name" name="firstname" 
                    onChange={handleInput} />
                    <Form.Text>
                        {errors.firstname && <span>{errors.firstname}</span>}
                    </Form.Text>
                </div>
                <div className='my-2'>
                    <Form.Label htmlFor="middlename">Middle Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Middle Name" name="middlename" 
                    onChange={handleInput} />
                    <Form.Text>
                        {errors.middlename && <span>{errors.middlename}</span>}
                    </Form.Text>
                </div>
                <div className='my-2'>
                    <Form.Label htmlFor="lastname">Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name" name="lastname" 
                    onChange={handleInput} />
                    <Form.Text>
                        {errors.lastname && <span>{errors.lastname}</span>}
                    </Form.Text>
                </div>
                <div className='my-2'>
                    <Form.Label htmlFor="dob">Date of Birth</Form.Label>
                    <Form.Control type="date" placeholder="Enter Last Name" name="dob" 
                    onChange={handleInput} />
                    <Form.Text>
                        {errors.dob && <span>{errors.dob}</span>}
                    </Form.Text>
                </div>
                <div className='my-2'>
                    <Form.Label htmlFor="mobile">Mobile</Form.Label>
                    <Form.Control type="text" placeholder="Enter Mobile Number" name="mobile" 
                    onChange={handleInput} />
                    <Form.Text>
                        {errors.mobile && <span>{errors.mobile}</span>}
                    </Form.Text>
                </div>
                </Col>

                <Col>         
                <h5>Address</h5>      
                
                <div className='my-2'>
                    <Form.Label htmlFor="addressDTO.buildingNo">Building No.</Form.Label>
                    <Form.Control className='mb-2' type="text" placeholder="Enter Building Number" name="addressDTO.buildingNo" 
                    onChange={handleInput} />
                    <Form.Text>
                        {errors.buildingNo && <span>{errors.buildingNo}</span>}
                    </Form.Text>

                    <Form.Label htmlFor="addressDTO.firstLine">First Line</Form.Label>
                    <Form.Control className='mb-2' type="text" placeholder="Enter First Line" name="addressDTO.firstLine" 
                    onChange={handleInput} />
                    <Form.Text>
                        {errors.firstLine && <span>{errors.firstLine}</span>}
                    </Form.Text>


                    <Form.Label htmlFor="addressDTO.secondLine">Second Line</Form.Label>
                    <Form.Control className='mb-2' type="text" placeholder="Enter Second Line" name="addressDTO.secondLine" 
                    onChange={handleInput} />
                    <Form.Text>
                        {errors.secondLine && <span>{errors.secondLine}</span>}
                    </Form.Text>

                    <Form.Label htmlFor="addressDTO.city">City</Form.Label>
                    <Form.Control className='mb-2' type="text" placeholder="Enter City" name="addressDTO.city" 
                    onChange={handleInput} />
                    <Form.Text>
                        {errors.city && <span>{errors.city}</span>}
                    </Form.Text>

                    <Form.Label htmlFor="addressDTO.county">County</Form.Label>
                    <Form.Control className='mb-2' type="text" placeholder="Enter County" name="addressDTO.county" 
                    onChange={handleInput} />
                    <Form.Text>
                        {errors.county && <span>{errors.county}</span>}
                    </Form.Text>


                    <Form.Label htmlFor="addressDTO.postCode">Post Code</Form.Label>
                    <Form.Control className='mb-2' type="text" placeholder="Enter Post Code" name="addressDTO.postCode" 
                    onChange={handleInput} />
                    <Form.Text>
                        {errors.postCode && <span>{errors.postCode}</span>}
                    </Form.Text>

                    {/* <label htmlFor="country">Country</label>
                    <input type="text" placeholder="Enter Country" name="country" 
                    onChange={handleInput} />
                    {errors.country && <span>{errors.country}</span>} */}
                </div>
                </Col>
                </Row>
                </Form.Group>

                <h3 className='my-3'>Proof of ID</h3>
                <div style={{ border: '1px solid', borderRadius: '10px', padding: '10px' }}>
                    
                    <small>As part of your application we require you to submit one form of government issued ID</small>
                    {errors.fileDTO && <span>{errors.fileDTO}</span>}
                    <div className='my-3'>
                        <label htmlFor="fileDTO.fileData">Identification Document:</label>
                        <input className='mx-3' type='file' name='fileDTO.fileData' onChange={handleInput} />
                    </div>
                    
                    <small>File format must be 1MB max and either PDF, JPG, PNG only.</small>
                    
                </div>

                <h3 className='my-3'>New Login Details</h3>
                <div  style={{ border: '1px solid', borderRadius: '10px', padding: '10px' }}>
                    
                    <div>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control className='mb-2' type="email" placeholder="Enter Email" name="email" 
                        onChange={handleInput} style={{ width: '400px' }}/>

                        <Form.Text>
                            {errors.email && <span>{errors.email}</span>}
                        </Form.Text>
                    </div>
                    <div>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control className='mb-2' type="password" placeholder="Enter Password" name="password" 
                        onChange={handleInput} style={{ width: '400px' }}/>
                        
                        <Form.Text>
                            {errors.password && <span>{errors.password}</span>}
                        </Form.Text>

                        <Form.Label htmlFor="confirmpassword">Confirm Your Password</Form.Label>
                        <Form.Control className='mb-2' type="password" placeholder="Enter Password Again" name="confirmpassword" 
                        onChange={handleInput} style={{ width: '400px' }}/>

                        <Form.Text>
                            {errors.confirmpassword && <span>{errors.confirmpassword}</span>}
                        </Form.Text>
                        
                        <div>
                            <small>Password must include one capital letter, 3 numbers and be at least 11 characters long.</small>
                        </div>
                    </div>
                </div>

                <Button type="submit" className="bg-info my-3">SIGN UP</Button>

            </Form>
            </Container>
        </div>
        </header>
    </div>
);
  
}

export default Signup