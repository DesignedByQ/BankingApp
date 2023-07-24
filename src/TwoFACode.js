import React, { useState, useEffect } from 'react'
import CodeValidation from './TwoFACodeVerification';
import { Link, useLocation,  useNavigate } from 'react-router-dom';
//import Login from './Login';
//import Validation from "./LoginValidation";

function TwoFACode() {

  const [values, setValues] = useState({
    code: '',
  });

  const location = useLocation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(CodeValidation(values));
  };

  const email = location.state?.email || ''; 

  const url = `http://localhost:8080/api/emails/${email}/codes/${values.code}`;

  const admin_url = `http://localhost:8082/api/emails/${email}/codes/${values.code}`;
  
  useEffect(() => {
   
    const putRequest = async (email) => {
      
      setIsLoading(true);
      setIsError(false);
      
      const eml = email.substring(email.length - 12)

      console.log(eml)

      try {

        if(eml !== "@infosys.com") {

          const response = await fetch(url, {
            method: 'PUT'
          });
        
          if (!response.ok) {
            
            setIsError(true);
            console.log(response)
            
          } else {
            //console.log(response.json)
            navigate('/custprofile', { state: { email: email } } );

          }

        } else if (eml === "@infosys.com") {

          const response = await fetch(admin_url, {
            method: 'PUT'
          });
        
          if (!response.ok) {
            
            setIsError(true);
            
          } else {
            //console.log(response.json)
            navigate('/adminportal', { state: { email: email } } );

          }

        }

      } catch (error) {

        setIsError(true);
        console.log(error);

      }

      setIsLoading(false);

    };

    if (errors.code === "") {
      putRequest(email);
    }

  }, [email, errors.code, navigate, url, admin_url]);

  return (
    <div className="">
      <div>
        {isLoading && <h2>Code verification successful! Logging in to user profile...</h2>}
        {isError && <h2>The code provided could not be verified</h2>}
        <h2>CODE VERIFICATION</h2>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="code">Code</label>
            <input
              type="number"
              placeholder="Enter Code"
              name="code"
              onChange={handleInput}
            />
            {errors.code && <span>{errors.code}</span>}
          </div>
        
          <button type="submit" className="">SUBMIT CODE</button>
          <button type="submit" className=""><Link to="/" className="">HOMEPAGE</Link></button>

        </form>
      </div>
    </div>
  );
}


export default TwoFACode;