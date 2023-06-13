import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';



function CustProfile() {
  const location = useLocation();
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { email } = location.state || {};

  //const email = location.state?.email || '';
  const url = `http://localhost:8080/api/getprofile/${email}`;

  //console.log(email)
  useEffect(() => {
    const getRequest = async () => {
      setIsError(false);

      try {
        const response = await fetch(url, {
          method: 'GET'
        });

        if (!response.ok) {
          setIsError(true);
        } else {
          const data = await response.json();
          setCustomer(data);
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
}, [email, url]);
    
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <div>
      {customer && (
        <div>
          <h3>Customer Username: {customer.authUserDTO.username}</h3>
          <h3>First Name: {customer.firstName}</h3>
          <h3>Middle Name: {customer.middleName}</h3>
          <h3>Last Name: {customer.lastName}</h3>
          <h3>Mobile: {customer.mobile}</h3>
          <h3>Email: {customer.email}</h3>
          <h3>
            Address: {`${customer.addressDTO.buildingNo}, ${customer.addressDTO.firstLine},
            ${customer.addressDTO.secondLine}, ${customer.addressDTO.city},
            ${customer.addressDTO.county}, ${customer.addressDTO.postCode},
            ${customer.addressDTO.country}`}
          </h3>
        </div>
      )}
        <p>list of accounts</p>
      <button type="submit">
        <Link to="/" className="">
          LOG OUT
        </Link>
      </button>
    </div>
  );
}

export default CustProfile;
