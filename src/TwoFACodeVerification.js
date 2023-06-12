function CodeValidation(values) {
    let error = {}
    const code_pattern = /^[0-9]+$/

    if(values.code === "") {
        error.code = "Code should not be empty"
    } else if(!code_pattern.test(values.code)) {
        error.code = "Code format is incorrect"
    } else {
        error.code = ""
    }

    return error;

}

export default CodeValidation