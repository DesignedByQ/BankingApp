# Banking Application

Infosys Project

This project is made up of the following microservices:

- Front-End (This repository)
- Add Customer Microservice (https://github.com/DesignedByQ/BankingAppUser)
- Account Application Microservice (https://github.com/DesignedByQ/BankingAppReg)
- Account Management Microservice (https://github.com/DesignedByQ/BankingAppAcc)
- Add Admin Staff Microservice (https://github.com/DesignedByQ/BankingAppAdminLogin/tree/Main)

**CONTENTS**

1. [RESOURCES](#RESOURCES)
2. [BRIEF & ADDITIONAL REQUIREMENTS](#BRIEF)
3. [MY APPROACH](#MY-APPROACH)
4. [RISK ASSESSMENT](#RISK-ASSESSMENT)
5. 
6. [ERD](#ENTITY-RELATIONSHIP-DIAGRAM)
7. [TECH USED & CICD PIPELINE](#TECHNOLOGY)
8. 
9. [HOW TO USE THE APP](#HOW-TO-USE-THE-APP)
10. [KNOWN ISSUES](#KNOWN-ISSUES)
11. [FUTURE IMPROVEMENTS](#FUTURE-IMPROVEMENTS)
12. [CONTRIBUTORS](#CONTRIBUTORS)
13. [ACKNOWLEDGEMENTS](#ACKNOWLEDGEMENTS)
14. [LICENSES](#LICENSES)

### RESOURCES

Jira: https://technology-project.atlassian.net/jira/software/projects/BAN/boards/1

### BRIEF

Instructions for this project were to create a banking app with the following criteria:
1. Login Page - 2 Factor Authentication
2. Landing Page: Customer details, Savings account details, Address, Phone number
3. Add/Edit details: Customer details, Address, Phone number
4. Add Money to the account
5. Withdraw Money from the account
6. Admin screen to add user
7. Display Transaction History
8. Generate Statement
9. Audit log of login/events
10. Upload address proof, ID proof

### MY APPROACH

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/d00ae1b3-afbc-48ec-a7fc-084f0551f67c)

### RISK ASSESSMENT

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/13688fc6-141d-4d0c-ae94-222fef097c72)

### ENTITY RELATIONSHIP DIAGRAM

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/6ebadc46-e683-49ab-a1df-c444254e0559)

### TECHNOLOGY

Database - MySQL
Back-End - Spring Boot / Java
Front-End - React
End Points - Postman

### HOW TO USE THE APP

Customer Journey

This is the path of a new customer who would like to open up a new account with Infosys Bank.

#### Home Page

- The user will click the ‘Start Application’ button to begin the process.

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/1a150833-dec8-4da7-9232-7af9498f5558)

Account Application

(Project brief criteria: 10. Upload address proof, ID proof)

New customers can:

-	Select account type.
-	Provide personal details.
-	Upload an indentification document.
-	Confirm future login credentials.
-	Once the application details have been entered the user can submit them using the ‘Sign Up’ button.

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/6eeef4b2-384b-4354-ae0f-8e1fcf412384)
![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/38c20ce0-faf6-4e80-8ae9-96da542a2362)
![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/951f86af-5191-430e-a9d3-37b326a2aa33)

Account Submitted

- This page displays a confirmation of the details submitted by the new  customer with instructions of what to next expect. The details provided will be used to create an account and customer proifle if an admin user verifies it.







