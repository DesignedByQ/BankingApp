function Validation(values) {
    let error = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const account_pattern = /(current|savings|creditcard)/
    const username_pattern = /^[a-zA-Z0-9]{2,100}$/
    const firstname_pattern = /^[a-zA-Z]{1,50}$/
    const middlename_pattern = /^[a-zA-Z]{1,50}$/
    const lastname_pattern = /^[a-zA-Z]{1,50}$/
    const dob_pattern = /^\d{4}-\d{2}-\d{2}$/
    const mobile_pattern = /^\d{11}$/
    const buildingNo_pattern = /^[0-9]{1,5}$/
    const firstLine_pattern = /^(?=.{1,100}$)[a-zA-Z]+(?: [a-zA-Z]+)?$/
    const secondLine_pattern = /^(?=.{1,100}$)[a-zA-Z]+(?: [a-zA-Z]+)?$/
    const city_pattern = /^(?=.{2,60}$)[a-zA-Z]+(?: [a-zA-Z]+)?$/
    const county_pattern = /^(?=.{1,30}$)[a-zA-Z]+(?: [a-zA-Z]+)?$/
    const postCode_pattern = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}$/i
    const confirmpassword = values.password


    //console.log(values.fileDTO.fileData)
    // Check if a file is selected
    if (!values.fileDTO.fileData) {
        error.fileDTO = 'Please select a file to upload for verification.';
    } else {

        // Get the file extension
        //var fileName = values.file.name;
        var fileExtension = values.fileDTO.fileData.split('.').pop().toLowerCase();
        //console.log(fileExtension)
        // Allowed file extensions
        var allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];

        // Check if the file extension is allowed
        if (!allowedExtensions.includes(fileExtension)) {
            error.fileDTO = 'Only PDF, JPG, and PNG files are allowed.';
        } else {

            // Validation successful, allow the form submission
            error.fileDTO = "";

        }

    }

    if(values.email === "") {
        error.email = "Email should not be empty"
    } else if(!email_pattern.test(values.email)) {
        error.email = "Email didn't match"
    } else {
        error.email = ""
    }

    if(values.password === "") {
        error.password = "Password should not be empty"
    } else if(!password_pattern.test(values.password)) {
        error.password = "Password didn't match"
    } else {
        error.password = ""
    }

    if(values.account === "") {
        error.account = "Please select an account type."
    } else if(!account_pattern.test(values.account)) {
        error.password = "The account type selected is invalid."
    }else {
        error.account = ""
    }

    if(values.username === "") {
        error.username = "Username should not be empty"
    } else if(!username_pattern.test(values.username)) {
        error.username = "Username must be between 2-100 characters long and include no special characters or spaces."
    } else {
        error.username = ""
    }

    if(values.firstname === "") {
        error.firstname = "First name should not be empty"
    } else if(!firstname_pattern.test(values.firstname)) {
        error.firstname = "First name should only contain alphabetic characters."
    } else {
        error.firstname = ""
    }

    if(values.middlename === "") {
        error.middlename = "Middle name should not be empty"
    } else if(!middlename_pattern.test(values.middlename)) {
        error.middlename = "Middle name should only contain alphabetic characters."
    } else {
        error.middlename = ""
    }

    if(values.lastname === "") {
        error.lastname = "Last name should not be empty"
    } else if(!lastname_pattern.test(values.lastname)) {
        error.lastname = "Last name should only contain alphabetic characters."
    } else {
        error.lastname = ""
    }

    if(values.dob === "") {
        error.dob = "Date of birth should not be empty"
    } else if(!dob_pattern.test(values.dob)) {
        error.dob = "Date of birth should only contain alphabetic characters."
    } else {
        error.dob = ""
    }

    if(values.mobile === "") {
        error.mobile = "Mobile should not be empty"
    } else if(!mobile_pattern.test(values.mobile)) {
        error.mobile = "Mobile should only contain numbers and should be 11 digits long."
    } else {
        error.mobile = ""
    }

    if(values.addressDTO.buildingNo === "") {
        error.buildingNo = "Building No. should not be empty"
    } else if(!buildingNo_pattern.test(values.addressDTO.buildingNo)) {
        error.buildingNo = "Building No. should only contain numbers and be no more than 5 digits."
    } else {
        error.buildingNo = ""
    }

    if(values.addressDTO.firstLine === "") {
        error.firstLine = "First line should not be empty"
    } else if(!firstLine_pattern.test(values.addressDTO.firstLine)) {
        error.firstLine = "First line should only contain letters and be no more than 100 characters."
    } else {
        error.firstLine = ""
    }

    if(values.addressDTO.secondLine === "") {
        error.secondLine = "Second line should not be empty"
    } else if(!secondLine_pattern.test(values.addressDTO.secondLine)) {
        error.secondLine = "Second line should only contain letters and be no more than 100 characters."
    } else {
        error.secondLine = ""
    }

    if(values.addressDTO.city === "") {
        error.city = "City should not be empty"
    } else if(!city_pattern.test(values.addressDTO.city)) {
        error.city = "City should only contain letters and be between 2-60 characters."
    } else {
        error.city = ""
    }

    if(values.addressDTO.county === "") {
        error.county = "County should not be empty"
    } else if(!county_pattern.test(values.addressDTO.county)) {
        error.county = "County should only contain letters and be between 1-30 characters."
    } else {
        error.county = ""
    }

    if(values.addressDTO.postCode === "") {
        error.postCode = "Post code should not be empty"
    } else if(!postCode_pattern.test(values.addressDTO.postCode)) {
        error.postCode = "Post code should only contain letters and numbers and be between 5-7 characters (excluding the space)."
    } else {
        error.postCode = ""
    }

    if(values.confirmpassword === "") {
        error.confirmpassword = "Please confirm your password, it should not be empty."
    } else if(confirmpassword !== values.password) {
        error.confirmpassword = "Passwords provided do not match!"
    } else {
        error.confirmpassword = ""
    }

    return error;

}

export default Validation