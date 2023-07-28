import React from 'react'
import Validation from './SignupValidation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const [values, setValues] = useState({
        account: '',
        username: '',
        firstname: '',
        middlename: '',
        dob: '',
        lastname: '',
        mobile: '',
        addressDTO: {buildingNo: '', firstLine: '', secondLine: '', city: '', county: '', postCode: ''},
        fileDTO: {fileName: '', fileType: '', fileData: ''},
        email: '',
        password: '',
        confirmpassword: '',
        approved: false,
        verdict: "TBC",
        
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleInput = (event) => {

        const { name, value, files } = event.target;

        if (name.includes('.')) {

            const [parent, child] = name.split('.');

            setValues((prev) => ({...prev, [parent]: { ...prev[parent], [child]: value }}));
        
        } else {

            setValues((prev) => ({
                ...prev, [name]: value
            }));

        }
        // console.log(values.fileDTO.fileType)
        // console.log(values.fileDTO.fileName)
        // console.log(values.fileDTO.fileData)
        // const fileExtension = values.fileDTO.fileData.split('.').pop().toLowerCase()
        // values.fileDTO.fileType = `"image/${fileExtension}"`
        
        // const fname = values.fileDTO.fileData.split('\\').pop().toLowerCase();
        // values.fileDTO.fileName = fname.split('.').shift().toLowerCase();
        // console.log(values.fileDTO.fileName)
        if (files && files[0]) {
            const reader = new FileReader();
            
            // const fname = values.fileDTO.fileData.split('\\').pop().toLowerCase();
            // values.fileDTO.fileName = fname.split('.').shift().toLowerCase();
            // console.log(1111)
            // console.log(files[0])
            // console.log(files[0].name)
            reader.onload = () => {
                const base64Image = reader.result;

                const base64ImageData = base64Image.split(',').pop()

                setValues((prev) => ({
                    ...prev,
                    fileDTO: { ...prev.fileDTO, fileData: base64ImageData, fileType: files[0].type, fileName: files[0].name },
                    
                }));
            };

            reader.readAsDataURL(files[0]);

        }
        // Read the image file (assuming you have access to the file object)
        // const fileReader = new FileReader();
        // fileReader.noload = function (event) {
        //     const base64Image = event.target.result

        //     values.fileDTO.fileData = base64Image
        // }

        //fileReader.readAsDataURL(`${values.fileDTO.fileData}`)

    }

    const url = `http://localhost:8081/api/uploadcust`;

    const handleSubmit = async (event) => {
       // console.log(values)
        event.preventDefault();
        setErrors(Validation(values));
        // if(errors.name === "" && errors.email === "" && errors.password === "") {
        //     axios.post('')
        // }
        
        if(Object.keys(errors).length === 0) {

            setIsLoading(true);
            setIsError(false);

            try {
                //console.log(JSON.stringify(values))
                const response = await fetch(url, {
                  method: 'POST',
                  headers: {
      
                      'Content-Type': 'application/json',
      
                  },
                  
                  body: JSON.stringify(values)
                  
                });
        
                if (!response.ok) {
                  
                  setIsError(true);
                  
                } else {

                    const data = await response.json();
                    console.log(data)
                    //do get req on submitted page
                  // this page should navigate to a details succeffully submitted page. check your emails within the next 24hrs for a decsion on your account
                    navigate('/submitted', { state: { submittedValues: data } });
        
                }
        
              } catch (error) {
        
                setIsError(true);
                console.log(error);
        
              }
        
              setIsLoading(false);

            }

        };
    
  return (
    <div className="">
        <div>
        {isLoading && <h2>Submitting details...</h2>}
        {isError && <h2>There has been an error with submitting your details, please try again later</h2>}
        <h2>Sign-Up</h2>

            <h2>Enter your details for your new account.</h2>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <fieldset>
                        <legend>Select which account you would like to open:</legend>
                        {errors.account && <span>{errors.account}</span>}
                        <div>
                            <input type="radio" id="current" name="account" value="current" checked={values.account === "current"} onChange={handleInput}/>
                            <label htmlFor="current">Current Account</label>
                        </div>

                        <div>
                            <input type="radio" id="savings" name="account" value="savings" checked={values.account === "savings"} onChange={handleInput}/>
                            <label htmlFor="savings">Savings Account</label>
                        </div>

                        <div>
                            <input type="radio" id="creditcard" name="account" value="creditcard" checked={values.account === "creditcard"} onChange={handleInput}/>
                            <label htmlFor="creditcard">Credit Card</label>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <small>Please insure all details provided match the identification document provided.</small>
                </div>
                <div>
                    <label htmlFor="username">User Name</label>
                    <input type="text" placeholder="Enter Username" name="username" 
                    onChange={handleInput} />
                    {errors.username && <span>{errors.username}</span>}
                </div>
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" placeholder="Enter First Name" name="firstname" 
                    onChange={handleInput} />
                    {errors.firstname && <span>{errors.firstname}</span>}
                </div>
                <div>
                    <label htmlFor="middlename">Middle Name</label>
                    <input type="text" placeholder="Enter Middle Name" name="middlename" 
                    onChange={handleInput} />
                    {errors.middlename && <span>{errors.middlename}</span>}
                </div>
                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" placeholder="Enter Last Name" name="lastname" 
                    onChange={handleInput} />
                    {errors.lastname && <span>{errors.lastname}</span>}
                </div>
                <div>
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" placeholder="Enter Last Name" name="dob" 
                    onChange={handleInput} />
                    {errors.dob && <span>{errors.dob}</span>}
                </div>
                <div>
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" placeholder="Enter Mobile Number" name="mobile" 
                    onChange={handleInput} />
                    {errors.mobile && <span>{errors.mobile}</span>}
                </div>
                <div>
                    <label htmlFor="addressDTO.buildingNo">Building No.</label>
                    <input type="text" placeholder="Enter Building Number" name="addressDTO.buildingNo" 
                    onChange={handleInput} />
                    {errors.buildingNo && <span>{errors.buildingNo}</span>}

                    <label htmlFor="addressDTO.firstLine">First Line</label>
                    <input type="text" placeholder="Enter First Line" name="addressDTO.firstLine" 
                    onChange={handleInput} />
                    {errors.firstLine && <span>{errors.firstLine}</span>}

                    <label htmlFor="addressDTO.secondLine">Second Line</label>
                    <input type="text" placeholder="Enter Second Line" name="addressDTO.secondLine" 
                    onChange={handleInput} />
                    {errors.secondLine && <span>{errors.secondLine}</span>}

                    <label htmlFor="addressDTO.city">City</label>
                    <input type="text" placeholder="Enter City" name="addressDTO.city" 
                    onChange={handleInput} />
                    {errors.city && <span>{errors.city}</span>}

                    <label htmlFor="addressDTO.county">County</label>
                    <input type="text" placeholder="Enter County" name="addressDTO.county" 
                    onChange={handleInput} />
                    {errors.county && <span>{errors.county}</span>}

                    <label htmlFor="addressDTO.postCode">Post Code</label>
                    <input type="text" placeholder="Enter Post Code" name="addressDTO.postCode" 
                    onChange={handleInput} />
                    {errors.postCode && <span>{errors.postCode}</span>}

                    {/* <label htmlFor="country">Country</label>
                    <input type="text" placeholder="Enter Country" name="country" 
                    onChange={handleInput} />
                    {errors.country && <span>{errors.country}</span>} */}
                </div>
                <div>
                <h3>Proof of ID</h3>
                <small>As part of your application we require you to submit one form of government issued ID</small>
                {errors.fileDTO && <span>{errors.fileDTO}</span>}
                <div>
                    <label htmlFor="fileDTO.fileData">Identification Document</label>
                    <input type='file' name='fileDTO.fileData' onChange={handleInput} />
                </div>
                
                <small>File format must be 1MB max and either PDF, JPG, PNG only.</small>
                
                </div>
                <div>
                    <h3>New Login Details</h3>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter Email" name="email" 
                        onChange={handleInput} />
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" name="password" 
                        onChange={handleInput} />
                        {errors.password && <span>{errors.password}</span>}

                        <label htmlFor="confirmpassword">Confirm Your Password</label>
                        <input type="password" placeholder="Enter Password Again" name="confirmpassword" 
                        onChange={handleInput} />
                        {errors.confirmpassword && <span>{errors.confirmpassword}</span>}

                        
                        <div>
                            <small>Password must include one capital letter, 3 numbers and be at least 11 characters long.</small>
                        </div>
                    </div>
                </div>

                <button type="submit" className="">SIGN UP</button>

            </form>
        </div>
    </div>
);
  
}

export default Signup