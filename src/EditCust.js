import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditCust() {

    const [deletedAccounts, setDeletedAccounts] = useState([]);
    //const [isDeleted, setIsDeleted] = useState(false);
    const [isEditSuccessful, setIsEditSuccessful] = useState(false);
    const [customer, setCustomer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userId, setUserId] = useState("");
    const [values, setValues] = useState({    
        //idUserProfile: "",
        firstName: "",
        middleName: "",
        lastName: "",
        mobile: "",
        email: "",
        addressDTO: {
            buildingNo: "",
            firstLine: "",
            secondLine: "",
            city: "",
            county: "",
            postCode: "",
        },
        
    //    authUserDTO: {
    //         username: "",
    //    }

        // private Object[] accounts;

    });

    const closeAccount = async (accountNo) => {

        setIsLoading(true);

        const del_acc = `http://localhost:8083/api/deleteaccount/${accountNo}`;

        try {

            const response3 = await fetch(del_acc, {

                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000', 
                    'Content-Type': 'application/json'
                }

            })
            
            if(!response3.ok){

                setIsError(true)
                console.log("isError is " + isError)

            } else {

                const result = await response3;
                console.log(result)
                //add deleted account to list of deletedaccs
                setDeletedAccounts((prevDeletedAccounts) => [...prevDeletedAccounts, accountNo]);
                
            }

        } catch (error) {

            setIsError(true)
            console.log(error)

        } finally {

            setIsLoading(false)

        }

    }

    useEffect(() => {
        
        if (isEditSuccessful) {

            const timer = setTimeout(() => {
                setIsEditSuccessful(false);
            }, 5000);
      
            return () => {
                clearTimeout(timer);
            }
      
        }

    }, [isEditSuccessful]);

    const handleGetCust = async (e) => {
        e.preventDefault();

        const get_cust = `http://localhost:8080/api/getprobyid/${userId}`

        //console.log(get_cust)

        setIsLoading(true);

        try {

            const response1 = await fetch(get_cust, {

                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000', 
                    'Content-Type': 'application/json'
                }

            })

            if(!response1.ok) {

                setIsError(true)
                console.log("isError is " + isError)

            } else {

                const data = await response1.json();
                //console.log(data)
                setCustomer(data)
                
            }

            
        } catch (error) {

            setIsError(true)
            console.log(error)

        } finally {

            setIsLoading(false)

        }

    }

    //console.log(customer)

    //to post a patch request with new details

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)

        const patch_cust = `http://localhost:8080/api/updateuser/${userId}`;

        try {
            //console.log(values)

            const patchedValues = {}
            //values is an object
            //for each item in values if the value is not equal to "" add key, value pair to patchedValues

            for (const [key, value] of Object.entries(values)) {
                if (value !== "") {
                    patchedValues[key] = value;
                }
            }
            console.log(patchedValues)
            
            const response2 = await fetch(patch_cust, {

                method: 'PATCH',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000', 
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(patchedValues)

            })

            if(!response2.ok){

                setIsError(true)
                console.log("isError is " + isError)

            } else {

                const data = await response2.json();
                console.log(data)

                setIsEditSuccessful(true)

            }

        } catch (error) {

            setIsError(true)
            console.log(error)

        } finally {

            setIsLoading(false)

        }

    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
    return <div>Error occurred while fetching data</div>;
    }

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: "black", paddingTop: '20px', paddingBottom: '20px' }}>
        <header className="App-header">
            <Container className='bg-primary'>
                <div style={{ paddingTop: '1px' }}>
                    <h2 className='mt-2'>Enter the customer ID below: </h2>
                </div>
                <div>
                    <label htmlFor='userId'><h5>Search Customer By ID: </h5></label>
                    <input className='mx-3 my-3' type='number' placeholder='Enter Customer ID'  name='userId' value={userId} onChange={(e) => setUserId(e.target.value)} />
                </div>
                <div>
                    <Button className='my-3 bg-info' type='button' onClick={handleGetCust}>Find Customer</Button>
                </div>
            </Container>
            
            <Container className='my-3 bg-primary'>
            <div style={{ paddingTop: '1px' }} >
                {customer && (
                    
                <Form onSubmit={handleFormSubmit} >
                    <h2 className='mt-2'>Enter the fields you would like to change below: </h2>
                    <h6>Personal Details</h6>
                    <Form.Group controlId="formEdit">

                    <div style={{ width: '300px' }}>
                        <Form.Label htmlFor='firstName'>First Name: </Form.Label>
                        <Form.Control className='mb-2' type='text' placeholder={customer.firstName} name='firstName' value={values.firstName} onChange={(e) => setValues({ ...values, firstName: e.target.value })}/>  
                    </div>

                    <div style={{ width: '300px' }}>
                        <Form.Label htmlFor='lastName'>Last Name: </Form.Label>
                        <Form.Control className='mb-2' type='text' placeholder={customer.lastName} name='lastName' value={values.lastName} onChange={(e) => setValues({ ...values, lastName: e.target.value })}/>  
                    </div>

                    <div style={{ width: '300px' }}>
                        <Form.Label htmlFor='middleName'>Middle Name: </Form.Label>
                        <Form.Control className='mb-2' type='text' placeholder={customer.middleName} name='middleName' value={values.middleName} onChange={(e) => setValues({ ...values, middleName: e.target.value })}/>  
                    </div>

                    <div style={{ width: '300px' }}>
                        <Form.Label htmlFor='mobile'>Mobile: </Form.Label>
                        <Form.Control className='mb-2' type='number' placeholder={customer.mobile} name='mobile' value={values.mobile} onChange={(e) => setValues({ ...values, mobile: e.target.value })}/>  
                    </div>

                    <div style={{ width: '300px' }}>
                        <Form.Label htmlFor='email'>Email: </Form.Label>
                        <Form.Control className='mb-2' type='email' placeholder={customer.email} name='email' value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })}/>  
                    </div>

                    <div>
                        <h6>Address</h6>
                     
                        <div style={{ width: '300px' }}>
                            <Form.Label htmlFor='addressDTO.buildingNo'>Building No.: </Form.Label>
                            <Form.Control className='mb-2' type='text' placeholder={customer.addressDTO.buildingNo} name='addressDTO.buildingNo' value={values.addressDTO.buildingNo} onChange={(e) => setValues({ ...values, addressDTO: { ...values.addressDTO, buildingNo: e.target.value }})}/>  
                        </div>

                        <div style={{ width: '300px' }}>
                            <Form.Label htmlFor='addressDTO.firstLine'>First Line: </Form.Label>
                            <Form.Control className='mb-2' type='text' placeholder={customer.addressDTO.firstLine} name='addressDTO.firstLine' value={values.addressDTO.firstLine} onChange={(e) => setValues({ ...values, addressDTO: { ...values.addressDTO, firstLine: e.target.value }})}/>  
                        </div>

                        <div style={{ width: '300px' }}>
                            <Form.Label htmlFor='addressDTO.secondLine'>Second Line: </Form.Label>
                            <Form.Control className='mb-2' type='text' placeholder={customer.addressDTO.secondLine} name='addressDTO.secondLine' value={values.addressDTO.secondLine} onChange={(e) => setValues({ ...values, addressDTO: { ...values.addressDTO, secondLine: e.target.value }})}/>  
                        </div>
     
                        <div style={{ width: '300px' }}>
                            <Form.Label htmlFor='addressDTO.city'>City: </Form.Label>
                            <Form.Control className='mb-2' type='text' placeholder={customer.addressDTO.city} name='addressDTO.city' value={values.addressDTO.city} onChange={(e) => setValues({ ...values, addressDTO: { ...values.addressDTO, city: e.target.value }})}/>  
                        </div>
      
                        <div style={{ width: '300px' }}>
                            <Form.Label htmlFor='addressDTO.county'>County: </Form.Label>
                            <Form.Control className='mb-2' type='text' placeholder={customer.addressDTO.county} name='addressDTO.county' value={values.addressDTO.county} onChange={(e) => setValues({ ...values, addressDTO: { ...values.addressDTO, county: e.target.value }})}/>  
                        </div>
             
                        <div style={{ width: '300px' }}>
                            <Form.Label htmlFor='addressDTO.postCode'>Post Code: </Form.Label>
                            <Form.Control className='mb-2' type='text' placeholder={customer.addressDTO.postCode} name='addressDTO.postCode' value={values.addressDTO.postCode} onChange={(e) => setValues({ ...values, addressDTO: { ...values.addressDTO, postCode: e.target.value }})}/>  
                        </div>

                    </div>

                    <small className='my-1'>{isEditSuccessful && "Customer details have been successfully updated!"}</small>
                    <div>
                        <Button type='submit' className='my-3 bg-info'>Edit Customer</Button>
                    </div>
                    </Form.Group>

                    <h2>Customer Accounts: </h2>
                
                    {customer.accounts.map((account, index) => (
                    <div key={index}>
                        <h5>Account Type: {account[2].toUpperCase()}</h5>
                        <h5>Account Number: {account[0]}</h5>
                        <h5>Account Sort Code: {account[1]}</h5>
                        <h5>Account Balance: {account[3]}</h5>
                        <small>{deletedAccounts.includes(account[0]) && `Account ${account[0]} was deleted successfully!`}</small>
                        {!deletedAccounts.includes(account[0]) && (
                            <Button type='button' className='my-3 bg-info' onClick={() => closeAccount(account[0])}>Close Account</Button>
                        )}
                    </div>
                    ))}

                </Form>

                )}
            </div>
            </Container>
        </header>
    </div>
  )
}

export default EditCust

