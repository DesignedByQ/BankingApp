import React, { Component } from "react";
import { Link } from "react-router-dom";

export class VerifyAccounts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: [],
      isLoading: true,
      isError: false,
      approvedCust: {},
      newItem: {},
      RejectionReason: '',
      custAcc: {},
      newData: {},
    };
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest = async () => {
    const get_url = "http://localhost:8081/api/allapplications";
    this.setState({ isLoading: true });
    try {
      const response = await fetch(get_url, {
        method: "GET",
        headers: {

            'Access-Control-Allow-Origin': 'http://localhost:3000'

        }
      });
      if (!response.ok) {
        this.setState({ isError: true });
      } else {
        const data = await response.json();
        this.setState({ user: data });
      }
    } catch (error) {
      this.setState({ isError: true });
      console.log(error);
    }
    this.setState({ isLoading: false });
  };

  renderImage(base64String, base64Type) {

    //const typeMatch = base64String.match(/^data:(.*?);base64,/);
    
    if (base64String && base64Type) {
      const imageUrl = `data:${base64Type};base64,${base64String}`;
      return imageUrl;
    }
    return null;
  }

  handleSubmit = async (event, item) => {
  
    event.preventDefault();
    //console.log(this.state.user)
    //console.log(item)

    const { newItem, approvedCust, custAcc } = this.state; 

    newItem.approved = true;
    newItem.verdict = "Your application for a new account has been approved! Please use your email address and password to login. You will then be sent a 2 Factor Authentication code via email to access your customer portal."
    //console.log(item)
    
    approvedCust.authUserDTO = {
        //idAuthUser: null,
        username: item.username,
        password: item.password,
        isSuperuser: false,
        isStaff: false,
    };
    approvedCust.firstName = item.firstname;
    approvedCust.middleName = item.middlename;
    approvedCust.lastName = item.lastname;
    approvedCust.mobile = item.mobile;
    approvedCust.email = item.email;
    approvedCust.addressDTO = {
       // addressID: null,
        buildingNo: item.addressDTO.buildingNo,
        firstLine: item.addressDTO.firstLine,
        secondLine: item.addressDTO.secondLine,
        city: item.addressDTO.city,
        county: item.addressDTO.county,
        postCode: item.addressDTO.postCode,
        country: item.addressDTO.country,
    };

    //console.log(JSON.stringify(approvedCust))
    //console.log(JSON.stringify(this.state.user[0]["firstname"]))

    const url = "http://localhost:8080/api/adduser";

    const update_url = `http://localhost:8081/api/updateapplication/${item.email}`;

    const account_url = `http://localhost:8083/api/createaccount`;
    
    this.setState({ isLoading: true, isError: false });

    try {
        //console.log(JSON.stringify(this.state.user))
        const response1 = await fetch(url, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000', 
                'Content-Type': 'application/json',
                    
            },
            
            body: JSON.stringify(approvedCust)
          
        });

        let response2;
        let response5;

        if (!response1.ok) {

            this.setState({ isError: true });
          
        } else {

            const data = await response1.json();
            console.log(data)
           
            console.log(newItem)

            response2 = await fetch(update_url, {
                method: 'PATCH',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                    
                },
                
                body: JSON.stringify(newItem)
                
            });

            custAcc.type = item.account;
            custAcc.balance = 0;
            custAcc.sortCode = 111111;
            custAcc.userProfileDTO = [data]
            console.log(custAcc)
            response5 = await fetch(account_url, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(custAcc)

            });

            //console.log(custAcc)
    
        } 

        //Update registation DB response
        if (!response2.ok) {
        
        this.setState({ isError: true })
        
        } else {

            //window.location.reload();  
            this.getRequest()
        } 

        //Add account response
        if (!response5.ok) {
        
            this.setState({ isError: true })
        
        } else {

            //window.location.reload();  
            this.getRequest()
            const accDets = await response5.json();
            console.log(accDets)

        } 
                
        } catch (error) {

            this.setState({ isError: true })
            console.log(error);

        }

      this.setState({ isLoading: false })

    }

    handleInput = async (event) => {

        this.setState({RejectionReason: event.target.value });
         
    }   

    handleRejection = async (event, item) => {

        event.preventDefault();

        const { newItem, RejectionReason } = this.state;

        newItem.verdict = RejectionReason
        newItem.rejected = true

        const update_url = `http://localhost:8081/api/updateapplication/${item.email}`;

        const delete_url = `http://localhost:8081/api/deleteapplication/${item.email}`;
    
        this.setState({ isLoading: true, isError: false });
    
        try {
            
            const response3 = await fetch(update_url, {
                method: 'PATCH',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                    
                },
                
                body: JSON.stringify(newItem)
                
            });
    
            if (!response3.ok) {
    
                this.setState({ isError: true });
              
            } else {

                console.log(response3)
                //window.location.reload();  
                this.getRequest()

                const response4 = await fetch(delete_url, {
                    method: 'DELETE',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Content-Type': 'application/json',
                        
                    },
                    
                });

                if (!response4.ok) {
    
                    this.setState({ isError: true });
                  
                } else {

                    console.log(response4)
                    //window.location.reload();  
                    this.getRequest()

                }

            } 
                    
            } catch (error) {
    
                this.setState({ isError: true })
                console.log(error);
    
            }
    
        this.setState({ isLoading: false })
    
    }

    // goBack = () => {
    //   this.props.history.goBack();
    // }
        
  render() {
    const { user, isLoading, isError } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (isError) {
      return <div>Error occurred while fetching data</div>;
    }  

    return (
        
      <div>
                    {/* <div>
                {selectedItem && selectedItem.email && (
                <button type="button">
                    <Link to={{ pathname: "/adminportal", state: { email: selectedItem.email } }}>ADMIN PORTAL</Link>
                </button>
                )}
              
            </div> */}
        <h2>Choose an account from below to start</h2>
        {user.map((item) => {
            if (!item.approved & !item.rejected) {
                
                return (
                  
                    <form action="" onSubmit={(event) => this.handleSubmit(event, item)} key={item.id}>
        
                      <div>
                        <h3>Customer ID: {item.custid}</h3>

                        <h3>Customer Name: </h3>
                        <p><b>First Name: </b>{item.firstname}</p>
                        <p><b>Middle Name: </b>{item.middlename}</p>
                        <p><b>Last Name: </b>{item.lastname}</p>

                        <h3>Account Requested: </h3>
                        <p><b>{item.account}</b></p>
                        <p><b>Date of Birth: </b>{item.dob}</p>

                        <h3>Contact Information: </h3>
                        <p><b>Mobile: </b>{item.mobile}</p>
                        <p><b>Email: </b>{item.email}</p>

                        <h3>Customer Address: </h3>
                        <p><b>Building No. </b>{item.addressDTO.buildingNo}</p>
                        <p><b>First Line: </b>{item.addressDTO.firstLine}</p>
                        <p><b>Second Line: </b>{item.addressDTO.secondLine}</p>
                        <p><b>City: </b>{item.addressDTO.city}</p>
                        <p><b>County: </b>{item.addressDTO.county}</p>
                        <p><b>Post Code: </b>{item.addressDTO.postCode}</p>
                        <p><b>Country: </b>{item.addressDTO.country}</p>

                        <p>Does the document below match the details above?</p>
                        <h3>ID submitted: </h3>
                        <p>File Name: {item.fileDTO.fileName}</p>
                        <p>File Type: {item.fileDTO.fileType}</p>
                        
                        <div>
                            {item.fileDTO.fileType === "application/pdf" ? (
                                <object data={this.renderImage(item.fileDTO.fileData, item.fileDTO.fileType)} type="application/pdf" width="75%" height="100%">
                                    <p>This browser does not support PDF rendering.</p>
                                </object> ) : ( <img src={this.renderImage(item.fileDTO.fileData, item.fileDTO.fileType)} alt="Customers proof of ID"/>)}
                        </div>
                                
                        <p>Approved: {item.approved.toString()}</p>
                        <p>Approved: {item.rejected.toString()}</p>

                        <button type="submit">Approve Account</button> 
                        
                        <div>
                            <label htmlFor="RejectionReason">Rejection-Reason</label>
                            <textarea type="text" rows="5" cols="10" name="RejectionReason" spellCheck="true" placeholder="Provide a message so the customer knows why their application has been rejected. Kindly request they resubmit their application with the correct details." onChange={this.handleInput}></textarea>
                        </div>
                        <button type="button" onClick={(event) => this.handleRejection(event, item)}>Reject Account</button>
                        <h4>*************************************</h4>
                        
                      </div>                
                    </form>
                    
                );
            
            }

            return null;

        })}  

        <button type="button" ><Link to="/adminportal">Admin Portal</Link></button>
        

      </div>
    );
    
  }
  
}

export default VerifyAccounts;
