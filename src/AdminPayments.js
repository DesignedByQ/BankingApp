import React, { useEffect, useState } from 'react'

function AdminPayments() {

    const [formData, setFormData] = useState({
        accountId: "",
        sortCode: "",
        amount: "",
        reference: "",
        accountId1: "",
        sortCode1: ""
    });

    const [isTransferSuccessful, setIsTransferSuccessful] = useState(false);
    const [isTransferSuccessfulInt, setIsTransferSuccessfulInt] = useState(false);

    const handleSubmitAdd = async (e) => {
        e.preventDefault();

        const longVal = parseInt(formData.accountId, 10)
        //console.log(url)
        console.log(formData.accountId)
        console.log(typeof longVal)

        const add_url = `http://localhost:8083/api/updatebalance/${formData.accountId}`;

        const url = `http://localhost:8083/api/getaccount/${longVal}`;

        try {

            const response = await fetch(url, {
                method: 'GET'
            });

            if (!response.ok) {
                //setIsError(true);
                console.log("error is true")
            } else {
                const data = await response.json();
                //setFormData(data);
                console.log(data)
                //check that the SC is the same if so add amount to balance and patch the balance
             
                if(parseInt(formData.sortCode) === data.sortCode){
                    data.balance += parseInt(formData.amount)

                    const doubleBal = Number(data.balance)

                    console.log(doubleBal)

                    const dataObject = {

                        balance: doubleBal
                        // transLogDTO: {
                        //     date: new Date(),
                        //     oldBal: Number(data.balance),
                        //     from: 99999999,
                        //     amount: Number(formData.amount),
                        //     reference: "Bank Clerk Transaction",
                        //     newBal: Number(doubleBal),
                        //     to: parseInt(formData.accountId)
                        // }

                    }

                    console.log(dataObject)

                    const response1 = await fetch(add_url, {
                        method: 'PATCH',
                        headers: {
                          'Access-Control-Allow-Origin': 'http://localhost:3000', 
                          'Content-Type': 'application/json',  
                    },
                    
                    body: JSON.stringify(dataObject)
        
                    });
        
                    if (!response1.ok) {
                        //setIsError(true);
                        console.log("error is true")
                    } else {
                        const data1 = await response1.json();
                        //setFormData(data);
                        console.log(data1)
                        handleClearForm()

                        setIsTransferSuccessful(true);
                    }
                }
            }

        } catch (error) {
            //setIsError(true);
            console.log(error);
        }
    };

    const handleSubmitInt = async (e) => {
        e.preventDefault();
        
        //const acc1 = parseInt(formData.accountId)

        //const acc2 = parseInt(formData.accountId1)


        const int_url = `http://localhost:8083/api/transfer/from/${formData.accountId}/to/${formData.accountId1}`;

        const url = `http://localhost:8083/api/getaccount/${formData.accountId}`;

        const url1 = `http://localhost:8083/api/getaccount/${formData.accountId1}`;

        try {

            const response2 = await fetch(url, {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000', 
                    'Content-Type': 'application/json',  
              },
            })

            const response22 = await fetch(url1, {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000', 
                    'Content-Type': 'application/json',  
              },
            })

            if(!response2.ok || !response22.ok){

                //setIsError(true)
                console.log(response2.error)
                console.log(response22.error)

            } else {

                const data2 = await response2.json();
                console.log(data2)

                const data22 = await response22.json();
                console.log(data22)

                if((parseInt(formData.sortCode) === data2.sortCode) && (parseInt(formData.sortCode1) === data22.sortCode)){

                    // const doubleBal = Number(data.balance)

                    // console.log(doubleBal)

                    // const dataObject = {}


                    //const input = parseInt(formData.amount)

                    const doubleBal = Number(formData.amount)
                    console.log(doubleBal)

                    const balObj = {
                        balance: doubleBal,
                        transLogDTO: {reference: formData.reference}
                    }

                    console.log(balObj)

                    try {

                        const response3 = await fetch(int_url, {
                            method: 'PATCH',
                            headers: {
                                'Access-Control-Allow-Origin': 'http://localhost:3000', 
                                'Content-Type': 'application/json',
                            },

                            body: JSON.stringify(balObj)

                        });

                        if(!response3.ok){

                            console.log(response3.error)

                        } else {

                            const data3 = response3.json();

                            console.log(data3)

                            handleClearForm()

                            setIsTransferSuccessfulInt(true)

                        }

                    } catch (error) {
                        //setIsError(true);
                        console.log(error);
                    
                    }

                } else {
                    console.log("Matching accounts not found")
                }

            }

        } catch (error) {
            //setIsError(true);
            console.log(error);
        
        }

    }

    const handleClearForm = () => {
        setFormData({
            accountId: "",
            sortCode: "",
            amount: "",
            reference: "",
            accountId1: "",
            sortCode1: ""
        });
    };

    useEffect(() => {
        if (isTransferSuccessful) {
            const timer = setTimeout(() => {
                setIsTransferSuccessful(false);
                setIsTransferSuccessfulInt(false);
            }, 5000);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [isTransferSuccessful]);


  return (
    <div>
        <h1>Cashier</h1>

        <p>Infosys Bank Sort Code 12-34-56</p>

        <h2>Add funds to customer account.</h2>

        <form onSubmit={handleSubmitAdd}>

            <div>

                <label htmlFor='accountId'><h4>Account Number:</h4></label>
                <input type="number" name='accountId' value={formData.accountId} onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}/>

                <label htmlFor='sortCode'><h4>Sort Code:</h4></label>
                <input type="number" name='sortCode' value={formData.sortCode} onChange={(e) => setFormData({ ...formData, sortCode: e.target.value })}/>

                <label htmlFor='amount'><h4>Amount:</h4></label>
                <input type="number" name='amount' value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })}/>
                <p></p>
                <small>{isTransferSuccessful && "Transfer was successful!"}</small>
                <div>
                    <button type='button' onClick={handleClearForm}>Clear Form</button>
               
                    <button type='submit'>Confirm</button>
                </div>

                <hr/>
                
            </div>

        </form>

        <form onSubmit={handleSubmitInt}>

            <h2>Transfer funds to internal account.</h2>

            <div>
                
                <label htmlFor='accountId'><h4>From account:</h4></label>
                <input type="number" name='accountId' value={formData.accountId} onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}/>

                <label htmlFor='sortCode'><h4>Sort Code:</h4></label>
                <input type="number" name='sortCode' value={formData.sortCode} onChange={(e) => setFormData({ ...formData, sortCode: e.target.value })}/>

                <label htmlFor='accountId1'><h4>To account:</h4></label>
                <input type="number" name='accountId1' value={formData.accountId1} onChange={(e) => setFormData({ ...formData, accountId1: e.target.value })}/>

                <label htmlFor='sortCode1'><h4>Sort Code:</h4></label>
                <input type="number" name='sortCode1' value={formData.sortCode1} onChange={(e) => setFormData({ ...formData, sortCode1: e.target.value })}/>

                <label htmlFor='amount'><h4>Amount:</h4></label>
                <input type="number" name='amount' value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })}/>      

                <label htmlFor='reference'><h4>Reference:</h4></label>
                <input type="text" name='reference' value={formData.reference} onChange={(e) => setFormData({ ...formData, reference: e.target.value })}/>
                <p></p>
                <small>{isTransferSuccessfulInt && "Transfer was successful!"}</small>
                <div>
                    <button type='button' onClick={handleClearForm}>Clear Form</button>
               
                    <button type='submit'>Confirm</button>
                </div>

                date for transation

                <hr/>
                
            </div>
        
        </form>

        <form>

            <h2>Transfer funds to external account.</h2>
            
            <div>

                <label htmlFor='accountId'><h4>From account:</h4></label>
                <input type="number" name='accountId' value={formData.accountId} onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}/>

                <label htmlFor='sortCode'><h4>Sort Code:</h4></label>
                <input type="number" name='sortCode' value={formData.sortCode} onChange={(e) => setFormData({ ...formData, sortCode: e.target.value })}/>

                <label htmlFor='accountId'><h4>To account:</h4></label>
                <input type="number" name='accountId1'/>

                <label htmlFor='sortCode'><h4>Sort Code:</h4></label>
                <input type="number" name='sortCode1'/>

                <label htmlFor='bank'><h4>Bank Name:</h4></label>
                <select name="bank">
                    <option value="">Choose Bank</option>
                    <option value="infosys">Infosys</option>
                    <option value="halifax">Halifax</option>
                    <option value="hsbc">HSBC</option>
                    <option value="natwest">Natwest</option>
                    <option value="virgin">Virgin Money</option>
                    <option value="santander">Santander</option>
                </select>

                <label htmlFor='amount'><h4>Amount:</h4></label>
                <input type="number" name='amount' value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })}/>

                <label htmlFor='reference'><h4>Reference:</h4></label>
                <input type="text" name='reference' value={formData.reference} onChange={(e) => setFormData({ ...formData, reference: e.target.value })}/>
                <p></p>
                <div>
                    <button type='button'>Clear Form</button>
               
                    <button type='submit'>Confirm</button>
                </div>

                date for transation

                <hr/>
                
            </div>

        </form>

    </div>
  )
}

export default AdminPayments
