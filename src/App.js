import Login from "./Login"
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from "./Signup";
import TwoFACode from "./TwoFACode"
import CustProfile from "./CustProfile";
import Submitted from "./Submitted";
import AdminPortal from "./AdminPortal";
import { VerifyAccounts } from "./components/VerifyAccounts";
//import AdminLogins from "./components/AdminLogins";
import AdminLogin from "./AdminLogin";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/twofacode' element={<TwoFACode />}></Route>
                <Route path='/custprofile' element={<CustProfile />}></Route>
                <Route path='/submitted' element={<Submitted />}></Route>
                <Route path='/adminportal' element={<AdminPortal />}></Route>
                <Route path='/verifyaccounts' element={<VerifyAccounts />}></Route>
                <Route path='/adminlogin' element={<AdminLogin />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;