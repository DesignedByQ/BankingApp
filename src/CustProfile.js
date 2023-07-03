import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function CustProfile() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { email } = location.state || {};

  //const email = location.state?.email || '';
  const url = `http://localhost:8080/api/getprofile/${email}`;

  const admin_url = `http://localhost:8082/api/getadmin/${email}`;

  //console.log(email)
  useEffect(() => {

    const getRequest = async () => {

      setIsError(false);

      const eml = email.substring(email.length - 13)

      if (eml !== "@infosys.com") {

        try {
          const response = await fetch(url, {
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

      } else if (eml === "@infosys.com") {

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

      }

      setIsLoading(false);
    };

    if(email){
        getRequest();
    }
}, [email, url, admin_url]);
    
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
      {user && (
        <div>
          <h2>Welcome to your customer portal</h2>
          <h3>Username: {user.authUserDTO.username}</h3>
          <h3>First Name: {user.firstName}</h3>
          <h3>Middle Name: {user.middleName}</h3>
          <h3>Last Name: {user.lastName}</h3>
          <h3>Mobile: {user.mobile}</h3>
          <h3>Email: {user.email}</h3>
          <h3>
            Address: {`${user.addressDTO.buildingNo}, ${user.addressDTO.firstLine},
            ${user.addressDTO.secondLine}, ${user.addressDTO.city},
            ${user.addressDTO.county}, ${user.addressDTO.postCode},
            ${user.addressDTO.country}`}
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
