// import React, { useState } from "react";
// import "./loginform.css"

// const LoginForm = () => {

// const [popupStyle, showPopup] = useState("hide")

// const popup = () => {
//     showPopup("login-popup")
//     setTimeout(() => showPopup("hide"), 3000)
// }

//     return (
//         <div className="cover">
//             <h1>Login</h1>
//             <input type="text" placeholder="USERNAME" />
//             <input type="password" placeholder="PASSWORD" />

//             <div className="login-btn">LOGIN</div>

//             <p className="text">OR LOGIN USING</p>

//             <div className="alt-login">
//                 <div className="facebook"></div>
//                 <div className="google"></div>
//             </div>

//             <div className={popupStyle}>
//                 <h3>LOGIN FAILED</h3>
//                 <p>USERNAME OR PASSWORD INCORRECT</p>
//             </div>

//         </div>
//     )
// }

// export default LoginForm