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

  useEffect(() => {
    
    const putRequest = async () => {

      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(url, {
          method: 'PUT'
        });

        if (!response.ok) {
          
          setIsError(true);
          
        } else {

          navigate('/custprofile');

        }

      } catch (error) {

        setIsError(true);
        console.log(error);

      }

      setIsLoading(false);

    };

    if (errors.code === "") {
      putRequest();
    }

  }, [errors.code, navigate, url]);

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