// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

// function AdminLogins() {
//   const location = useLocation();
//   const [logs, setLogs] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);

//   const { email } = location.state || {};

//   console.log(email)

//   const get_url = `http://localhost:8082/api/getlog/${email}`;

//   useEffect(() => {
//     const getRequest = async () => {
//       setIsLoading(true);
//       setIsError(false);

//       try {
        
//         const response = await fetch(get_url, {
//           method: 'GET',
//           headers: {
//             'Access-Control-Allow-Origin': 'http://localhost:3000',
//           },
//         });

//         if (!response.ok) {
//           setIsError(true);
//         } else {
//           const data = await response.json();
//           setLogs(data);
//         }
//       } catch (error) {
//         setIsError(true);
//         console.log(error);
//       }

//       setIsLoading(false);
//     };

//     if (email) {
//       getRequest();
//     }
//   }, [email, get_url]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error occurred while fetching data</div>;
//   }

//   return (
//     <div>
//       AdminLogins
//       {logs.map((item) => (
//         <div key={item.id}>
//           <h1>IP Address: {item.iP}</h1>
//         </div>
//       ))}
//       <button type="button">
//         <Link to="/adminportal">Admin Portal</Link>
//       </button>
//     </div>
//   );
// }

// export default AdminLogins;
