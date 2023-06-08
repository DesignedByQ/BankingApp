import React from "react";

function Login() {
    return (
        <div className="">
            <div>
                <form action="">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter Email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" />
                    </div>

                    <button className="">LOG IN</button>

                    <p>OR</p>

                    <p>Register for a new bank account</p>

                    <button className="">Start Application</button>

                </form>
            </div>
           

        </div>
    );
}

export default Login;