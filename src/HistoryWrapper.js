import React from "react";
import VerifyAccounts from "./components/VerifyAccounts";
import {useHistory} from "react-router-dom"
import AdminPortal from "./AdminPortal";

const HistoryWrapper = () =>{

    const history = useHistory();
    return <AdminPortal history={history} />
};

export default HistoryWrapper;