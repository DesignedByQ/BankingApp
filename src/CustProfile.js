import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import { saveAs } from 'file-saver';
import {PDFDownloadLink} from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import Text from './Text';

function CustProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountTransfersInt, setAccountTransfersInt] = useState(null);
  const [accountTransfersExt, setAccountTransfersExt] = useState(null);
  const [formData, setFormData] = useState({
    //internal
    accountId: "",
    sortCode: "",
    amount: "",
    reference: "",
    accountId1: "",
    sortCode1: "",

    //external
    accountId2: "",
    sortCode2: "",
    accountId3: "",
    sortCode3: "",
    bank: "",
    amount1: "",
    reference1: ""
  });
  const [isTransferSuccessful, setIsTransferSuccessful] = useState(false);
  const [isTransferSuccessfulInt, setIsTransferSuccessfulInt] = useState(false);
  const [isTransferSuccessfulExt, setIsTransferSuccessfulExt] = useState(false);

  const { email } = location.state || {};
  
  //const email = location.state?.email || '';
  const url = `http://localhost:8080/api/getprofile/${email}`;

  const admin_url = `http://localhost:8082/api/getadmin/${email}`;

  //console.log(email)
  useEffect(() => {

    const getRequest = async () => {

      setIsError(false);

      const eml = email.substring(email.length - 13)

      if (eml !== "@infosys.com") {

        try {
          const response = await fetch(url, {
            method: 'GET'
          });

          if (!response.ok) {
            setIsError(true);
          } else {
            const data = await response.json();
            setUser(data);
          }
        } catch (error) {
          setIsError(true);
          console.log(error);
        }

      } else if (eml === "@infosys.com") {

        try {
          const response = await fetch(admin_url, {
            method: 'GET'
          });

          if (!response.ok) {
            setIsError(true);
          } else {
            const data = await response.json();
            setUser(data);
          }
        } catch (error) {
          setIsError(true);
          console.log(error);
        }

      }

      setIsLoading(false);
    };

    if(email){
        getRequest();
    }
}, [email, url, admin_url, isTransferSuccessfulInt, isTransferSuccessfulExt]);

const viewTransactionsShow = (accountIndex) => {
  setAccountTransfersExt(null)
  setAccountTransfersInt(null)
  setSelectedAccount(accountIndex);
}

const viewTransactionsHide = () => {
  setSelectedAccount(null);
}

const makeIntTransferShow = (accountIndex) => {
  setSelectedAccount(null);
  setAccountTransfersExt(null)
  setAccountTransfersInt(accountIndex)
  const account = user.accounts[accountIndex];
  setFormData({
    ...formData,
    accountId: account[0],
    sortCode: account[1],
  })
}

const makeExtTransferShow = (accountIndex) => {
  setSelectedAccount(null);
  setAccountTransfersInt(null)
  setAccountTransfersExt(accountIndex)
  const account = user.accounts[accountIndex];
  setFormData({
    ...formData,
    accountId2: account[0],
    sortCode2: account[1],
  })
}

const handleSubmitInt = async (e) => {
  e.preventDefault();

  setIsLoading(true)

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

          setIsError(true)
          console.log("isError is " + isError)

      } else {

          const data2 = await response2.json();
          console.log(data2)

          const data22 = await response22.json();
          console.log(data22)

          if((parseInt(formData.sortCode) === data2.sortCode) && (parseInt(formData.sortCode1) === data22.sortCode)){

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

                      setIsError(true)
                      console.log("isError is " + isError)

                  } else {

                      const data3 = response3.json();

                      console.log(data3)

                      handleClearForm()

                      //getRequest();

                      setIsTransferSuccessfulInt(true)

                  }

              } catch (error) {
                  setIsError(true);
                  console.log(error);
              
              }

          } else {
              setIsError(true);
              console.log("Matching accounts not found")
          }

      }

  } catch (error) {
      setIsError(true);
      console.log(error);
  
  } finally {

    setIsLoading(false)

  }

}

const handleSubmitExt = async (e) => {
  e.preventDefault();

  const ext_url = `http://localhost:8083/api/transfer/external/from/${formData.accountId2}/to/${formData.accountId3}`;

  const url = `http://localhost:8083/api/getaccount/${formData.accountId2}`;

  try {

      const response4 = await fetch(url, {
          method: 'GET',
          headers: {
              'Access-Control-Allow-Origin': 'http://localhost:3000', 
              'Content-Type': 'application/json',  
          },
      })

      if(!response4.ok){

          setIsError(true)
          console.log("isError is " + isError)

      } else {

          const data4 = await response4.json();
          console.log(data4)

          if((parseInt(formData.sortCode2) === data4.sortCode)) {

              const doubleBal = Number(formData.amount1)
              console.log(doubleBal)

              const balObj = {
                  balance: doubleBal,
                  transLogDTO: {reference: formData.reference1}
              }

              console.log(balObj)

              try {

                  const response5 = await fetch(ext_url, {
                      method: 'PATCH',
                      headers: {
                          'Access-Control-Allow-Origin': 'http://localhost:3000', 
                          'Content-Type': 'application/json',
                      },

                      body: JSON.stringify(balObj)

                  });

                  if(!response5.ok){

                      setIsError(true)
                      console.log("isError is " + isError)

                  } else {

                      const data5 = response5.json();

                      console.log(data5)

                      handleClearForm()

                      setIsTransferSuccessfulExt(true)

                  }

              } catch (error) {
                  setIsError(true);
                  console.log(error);
              
              }

          } else {
              setIsError(true);
              console.log("Matching account not found")
          }
      
      }

  } catch (error) {
      setIsError(true);
      console.log(error);
  }

}

const handleClearForm = () => {
  setFormData({
      //internal
      accountId: "",
      sortCode: "",
      amount: "",
      reference: "",
      accountId1: "",
      sortCode1: "",
  
      //external
      accountId2: "",
      sortCode2: "",
      accountId3: "",
      sortCode3: "",
      bank: "",
      amount1: "",
      reference1: ""
  });
};

useEffect(() => {

  if (isTransferSuccessful) {

      const timer = setTimeout(() => {
          setIsTransferSuccessful(false);
      }, 5000);

      return () => {
          clearTimeout(timer);
      }

  } 
  
  if (isTransferSuccessfulInt) {

      const timer = setTimeout(() => {
          setIsTransferSuccessfulInt(false);
      }, 5000);

      return () => {
          clearTimeout(timer);
      }

  } 
  
  if (isTransferSuccessfulExt) {

      const timer = setTimeout(() => {
          setIsTransferSuccessfulExt(false);
      }, 5000);

      return () => {
          clearTimeout(timer);
      }

  }

}, [isTransferSuccessful, isTransferSuccessfulInt, isTransferSuccessfulExt]);

const getLog = async () => {
  navigate('/custlogin', { state: { email: email } });
}

const openAccount = async () => {
  navigate('/openaccount', { state: { email: email } });
}

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  // function generateFileContent(account) {
  //   let content = "";
  //   account[4]
  //     .slice()
  //     .sort((a,b) => a.transLogId - b.transLogId)
  //     .forEach((transLog, logIndex) => {
  //       // eslint-disable-next-line
  //       content += 'ID: ${transLog.transLogId} | Date: ${transLog.date} | Previous Balance: ${transLog.oldBal} | From Account: ${transLog.from} | Amount: ${transLog.amount} | Reference: ${transLog.reference} | New Balance: ${transLog.newBal} | To Account: ${transLog.to}\n';
  //     });
  //     return content;
  // }

  // const handleDownload = () => {
  //   const accountContent = generateFileContent(user.accounts[selectedAccount]);
  //   const blob = new Blob([accountContent], { type: 'application/pdf' })
  //   saveAs(blob, 'account_transactions.pdf');
  // };

  return (
    
    <div>
      
      {user && (
        <div>
          <h2>Welcome to your customer portal</h2>
          <h3>Username: {user.authUserDTO.username}</h3>
          <h3>First Name: {user.firstName}</h3>
          <h3>Middle Name: {user.middleName}</h3>
          <h3>Last Name: {user.lastName}</h3>
          <h3>Mobile: {user.mobile}</h3>
          <h3>Email: {user.email}</h3>
          <h3>
            Address: {`${user.addressDTO.buildingNo}, ${user.addressDTO.firstLine},
            ${user.addressDTO.secondLine}, ${user.addressDTO.city},
            ${user.addressDTO.county}, ${user.addressDTO.postCode},
            ${user.addressDTO.country}`}
          </h3>

          <div><button type='button' onClick={getLog}>Login History</button></div>

          <div><button type='button' onClick={openAccount}>Open Account</button></div>

          <h2>List of accounts</h2>

          <hr></hr>

          {user.accounts.map((account, index) => (
            <div key={index}>
              <h3>{account[2]}</h3>
              <h3>Account Number: {account[0]}</h3>
              <h3>Account Sort Code: {account[1]}</h3>
              <h3>Account Balance: {account[3]}</h3>

              <button type='button' onClick={() => viewTransactionsShow(index)}>Show Transactions</button>

              {selectedAccount === index && (
                <button type='button' onClick={viewTransactionsHide}>Hide Transactions</button>
              )}

              <button type='button' onClick={() => makeIntTransferShow(index)}>Internal Transfers</button>

              <button type='button' onClick={() => makeExtTransferShow(index)}>External Transfers</button>

              {selectedAccount === index && (
                <div>
                  <ul>
                    {account[4]
                    .slice()
                    .sort((a, b) => a.transLogId - b.transLogId)
                    .map((transLog, logIndex) => (

                      <li key={logIndex}>
                        ID: {transLog.transLogId} | Date: {transLog.date} | Previous Balance: {transLog.oldBal} | From Account: {transLog.from} | Amount: {transLog.amount} | Reference: {transLog.reference} | New Balance: {transLog.newBal} | To Account: {transLog.to}
                        <Text> ... </Text>
                        <p></p>
                      </li>
                      
                    ))}
                  
                  </ul>
                  {/* <button onClick={handleDownload}>Download Transactions</button> */}
                  <button><PDFDownloadLink document={<PDFDocument account={user.accounts[selectedAccount]} user={user} />} fileName="account_transactions.pdf">
                    {({ blob, url, loading, error }) => (loading ? 'Loading...' : 'Download Transactions as PDF')}
                  </PDFDownloadLink></button>
                </div>
              )}

            {accountTransfersInt === index && ( 
                <form onSubmit={handleSubmitInt}>

                  <h2>Transfer funds to internal account.</h2>
      
                  <div>

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
      
                  </div>
              
              </form>
            )}



            {accountTransfersExt === index && ( 
                      <form onSubmit={handleSubmitExt}>

                      <h2>Transfer funds to external account.</h2>
                      
                      <div>
          
                          <label htmlFor='accountId3'><h4>To account:</h4></label>
                          <input type="number" name='accountId3' value={formData.accountId3} onChange={(e) => setFormData({ ...formData, accountId3: e.target.value })}/>
          
                          <label htmlFor='sortCode3'><h4>Sort Code:</h4></label>
                          <input type="number" name='sortCode3' value={formData.sortCode3} onChange={(e) => setFormData({ ...formData, sortCode3: e.target.value })}/>
          
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
          
                          <label htmlFor='amount1'><h4>Amount:</h4></label>
                          <input type="number" name='amount1' value={formData.amount1} onChange={(e) => setFormData({ ...formData, amount1: e.target.value })}/>
          
                          <label htmlFor='reference1'><h4>Reference:</h4></label>
                          <input type="text" name='reference1' value={formData.reference1} onChange={(e) => setFormData({ ...formData, reference1: e.target.value })}/>
                          <p></p>
                          <small>{isTransferSuccessfulExt && "Transfer was successful!"}</small>
                          <div>
                              <button type='button' onClick={handleClearForm}>Clear Form</button>
                         
                              <button type='submit'>Confirm</button>
                          </div>
          
                          date for transation
                          
                      </div>
          
                  </form>
            )}
              <hr></hr>
              
            </div>
          ))}  
    
        
        </div>
        
      )}



      <button type="submit">
        <Link to="/" className="">
          LOG OUT
        </Link>
      </button>
    </div>
  );
}

export default CustProfile;
