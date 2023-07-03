import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AdminPortal() {

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
  
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching data</div>;
    }



  return (
    <div>

        <div>Staff ID: {user.idAdmin}</div>
        <div><h1>Welcome  {user.firstName}</h1></div>
        <div>Position: {user.username}</div>

        <div>What would you like to do today?</div>

        <div>
        <h2>Your Admin Details</h2>
        <h3>Full Name: {user.firstName} {user.middleName} {user.lastName}</h3>
        <h3>Mobile: {user.mobile}</h3>
        <h3>Email: {user.email}</h3>
        <h3>Address: {user.addressDTO.buildingNo}, {user.addressDTO.firstLine}, {user.addressDTO.secondLine}, {user.addressDTO.city}, {user.addressDTO.county}, {user.addressDTO.postCode}</h3>
 
        <h3>Staff Since: {user.staffSince}</h3>

        </div>

        <div><button type="type"><Link to="/verifyaccounts" className="">Verify Accounts</Link></button></div>

        <div><button >Add Staff</button></div>
        <div><button >Login Log</button></div>
        <div><button >Process Payments</button></div>
        <div><button >Compensation Claim</button></div>

        <p>To do list: You currently have ${} customer accounts waiting to be verified.</p>
    </div>
  )
}

export default AdminPortal