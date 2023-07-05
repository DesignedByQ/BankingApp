import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function AdminLogin() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { email } = location.state || {};
  //console.log(email)
  const get_url = `http://localhost:8082/api/getlog/${email}`;

  //console.log(email)
  useEffect(() => {

    const getRequest = async () => {

      setIsLoading(true);
      setIsError(false);

        try {
          const response = await fetch(get_url, {
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
}, [email, get_url]);
console.log(user)
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
      {user.map((item) => (
        <div key={item.id}>
          <h2>Recent Login History</h2>
          <h3>Login ID: {item.idLoginLog}</h3>
          <h3>IP Address: {item.iP}</h3>
          <h3>Location: {item.location}</h3>
          <h3>Event Time: {item.eventTime}</h3>
          <h3>Staff: {item.adminDTO.email}</h3>
          
        </div>
      ))}
        
      <button type="submit">
        <Link to="/adminportal" className="">
          ADMIN PORTAL
        </Link>
      </button>
    </div>
  );
}

export default AdminLogin;
