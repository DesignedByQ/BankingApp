import React from "react";
import { Link } from 'react-router-dom'
import Validation from "./LoginValidation";
import { useState } from "react";

function Login() {

    const [values, setValues] = useState({
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
            <h2>Sign-IN</h2>
                <form action="" onSubmit={handleSubmit}>
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

                    <button className="">LOG IN</button>

                    <p>OR</p>

                    <p>Register for a new bank account</p>

                    <button type="submit"><Link to="/signup" className="">Start Application</Link></button>

                </form>
            </div>
           

        </div>
    );
}

export default Login;