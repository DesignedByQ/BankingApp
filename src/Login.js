import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Validation from "./LoginValidation";
//import TwoFACode from "./TwoFACode";

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
  };

  const url = `http://localhost:8080/api/emails/${values.email}/password/${values.password}/2fa`;

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

          navigate('/twofacode', { state: { email: values.email } });

        }

      } catch (error) {

        setIsError(true);
        console.log(error);

      }

      setIsLoading(false);

    };

    if (errors.email === "" && errors.password === "") {
      putRequest();
    }

  }, [errors.email, errors.password, values.email, navigate, url]);

  return (
    <div className="">
      <div>
        {isLoading && <h2>Logging in...</h2>}
        {isError && <h2>There is no account with those credentials</h2>}
        <h2>Sign-IN</h2>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>

          <button type="submit" className="">LOGIN</button>

          <p>OR</p>

          <p>Register for a new bank account</p>

          <button type="submit">
            <Link to="/signup" className="">
              Start Application
            </Link>
          </button>
          {/* {values.email && <TwoFACode email={values.email} />} */}
        </form>
      </div>
      
    </div>
  );
}

export default Login;
