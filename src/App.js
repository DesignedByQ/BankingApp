import Login from "./Login"
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from "./Signup";
import TwoFACode from "./TwoFACode"
import CustProfile from "./CustProfile";
import Submitted from "./Submitted";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/twofacode' element={<TwoFACode />}></Route>
                <Route path='/custprofile' element={<CustProfile />}></Route>
                <Route path='/submitted' element={<Submitted />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;