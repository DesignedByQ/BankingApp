import Login from "./Login"
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}></Route>
                {/* <Route path='/signup' element={<Signup />}></Route> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;