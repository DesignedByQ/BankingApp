import React from 'react'
import { Link } from 'react-router-dom';
import Validation from './SignupValidation';
import { useState } from 'react';


function Signup() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    }
    
  return (
    <div className="">
        <div>
            <h2>Sign-Up</h2>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter Name" name="name" 
                    onChange={handleInput} />
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter Email" name="email" 
                    onChange={handleInput} />
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" name="password" 
                    onChange={handleInput} />
                    {errors.password && <span>{errors.password}</span>}
                </div>

                <button type="submit" className="">SIGN UP</button>

                <p>OR</p>

                <p>Register for a new bank account</p>

                <button><Link to="/" className="">Login</Link></button>

            </form>
        </div>
    </div>
);
  
}

export default Signup