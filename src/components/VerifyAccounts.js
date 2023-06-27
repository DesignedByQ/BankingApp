import React, { Component } from "react";

export class VerifyAccounts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: [],
      isLoading: true,
      isError: false,
      approvedCust: {},
    };
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest = async () => {
    const url = "http://localhost:8081/api/allapplications";
    this.setState({ isLoading: true });
    try {
      const response = await fetch(url, {
        method: "GET",
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

    console.log(item)

    const { approvedCust } = this.state;

    //approvedCust.idUserProfile = null;
    
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
    
    //do patch req to reg db with amended approved and verdict which will trigger email to cust

    console.log(JSON.stringify(approvedCust))
    console.log(JSON.stringify(this.state.user[0]["firstname"]))

    const url = "http://localhost:8080/api/adduser";
    
    this.setState({ isLoading: true, isError: false });

    try {
        //console.log(JSON.stringify(this.state.user))
        const response = await fetch(url, {
          method: 'POST',
          headers: {

              'Content-Type': 'application/json',

          },
          
          body: JSON.stringify(approvedCust)
          
        });

        if (!response.ok) {

            this.setState({ isError: true });
          
        } else {

            const data = await response.json();
            console.log(data)
            
          // sent email should say check your emails within the next 24hrs for a decsion on your account
           

        }

      } catch (error) {

        this.setState({ isError: true })
        console.log(error);

      }

      this.setState({ isLoading: false })

    }


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
        <h2>Choose an account from below to start</h2>
        {user.map((item) => (
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
                    
            <p>File Type: {item.approved}</p>

            <button type="submit">Approve Account</button> 
            {/* sends cust dets to add cust url with put req of approved = true and verdict = "account approved" and sends approval email*/}
            <button type="submit">Reject Account</button>
            <h4>*************************************</h4>
            
          </div>
          </form>
        ))}
        
      </div>
    );
  }
}

export default VerifyAccounts;
