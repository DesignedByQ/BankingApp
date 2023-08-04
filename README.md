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
2. [PROJECT BRIEF](#BRIEF)
3. [MY APPROACH](#MY-APPROACH)
4. [RISK ASSESSMENT](#RISK-ASSESSMENT)
5. [ERD](#ENTITY-RELATIONSHIP-DIAGRAM)
6. [TECH USED & CICD PIPELINE](#TECHNOLOGY)
7. [HOW TO USE THE APP](#HOW-TO-USE-THE-APP)
8. [FUTURE IMPROVEMENTS](#FUTURE-IMPROVEMENTS)
9. [CONTRIBUTORS](#CONTRIBUTORS)

### RESOURCES

Jira: https://technology-project.atlassian.net/jira/software/projects/BAN/boards/1

### PROJECT BRIEF

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

- Database: MySQL
- Back-End: Spring Boot / Java
- Front-End: React
- End Points: Postman

### HOW TO USE THE APP

### Customer Journey

This is the path of a new customer who would like to open up a new account with Infosys Bank.

#### Home Page

- The user will click the ‘Start Application’ button to begin the process.

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/1a150833-dec8-4da7-9232-7af9498f5558)

#### Account Application

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

#### Account Submitted

- This page displays a confirmation of the details submitted by the new  customer with instructions of what to next expect. The details provided will be used to create an account and customer proifle if an admin user verifies it.

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/4094fdfe-7725-42e2-9326-e89ea2e7f3ca)

#### Customer sign - in 

-	With the application details submitted, it is now the role of a admin staff to as part of their work load review the list of account applications pending approval or rejection.
- If the application is rejected, the customer will receive an email with the verdict and a message clarifying the reason why. At this point they are free to re-apply taking the reasons for rejection in to consideration.
-	Based on the assumption this cusomters application has been approved, they will receive an email to prove this and advise them on the next steps (see image below). 
-	They can now return to the home page where the customer can sign-in with the login credentials created at sign up.

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/1b9e6ed3-cd09-4952-8c86-5d90947aa071)

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/643b42c9-311e-4a2d-b4d6-5ab11df27242)

#### 2 Factor Authentication Process

(Project brief criteria: 1. Login Page - 2 Factor Authentication)

-	A 4 or 5 digit code will be sent to the email address used to register (see email below). 
-	The customer will use the code on the ‘code verification’ page.

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/6e3bb3b7-e12a-4810-b6f6-4d54b0791224)

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/70a57fb5-169a-41a7-a72e-c6e23ff77180)

#### Customer Portal

(Project brief criteria: 2. Landing Page: Customer details, Savings account details, Address, Phone number)

From this page customers can do the following:

-	Check their login history.
-	Open a new bank account.
-	View all their bank accounts they own along with the balance.
-	View the transaction history for each bank account.
-	Make transfers to other bank accounts.
-	Download all transactions specific to that account as a PDF.

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/1ad116b2-5061-4139-85b7-8130fad79249)

#### Login Audit

(Project brief criteria: 9. Audit log of login/events)

-	The customer login page will display the details of each successful login which includes the unique ID of each login, the IP address of the machine used, the email of the customer, the time and date.

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/c1be9394-e87f-41f2-83ae-0b0878a9759d)

#### Show Transactions

(Project brief criteria: 7. Display Transaction History)

-	Displays the unique ID of the transaction, the amount being transferred, the date of the transaction, the balance before the transaction, the balance after the transaction, information on what the transaction refers to, the source and destination of the transfer. 

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/b6bd12ca-8adb-4455-8a16-577e34587a3b)

#### Download Transaction Statement

(Project brief criteria: 8. Generate Statement)

-	Customer can download a list of all their transactions into a PDF document.

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/fe5ab996-1a9a-433a-b0d1-ec3d9867e714)

#### Money Transfers

(Project brief criteria: 4. Add Money to the account & 5. Withdraw Money from the account)

-	Customers can transfer money internally to other customer bank accounts within the infosys bank.
-	Customers can also transfer money to external  bank accounts held outside the infosys bank.

##### Internal 

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/d6645251-2962-4db7-808f-31758c0704b9)

##### External

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/9442b7f9-dbfa-4b1c-ad31-0232669d3d91)

### Administrator Journey

This is the path of an existing adminstator / manager set up on the system.

#### Homepage 

-	Admin staff (or manager / superuser) users can sign-in to the admin portal here.
-	Existing customers can sign-in here.
-	System will auto detect the email addresses used to determine whether it’s a customer or admin user (@infosys.com).

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/0045f52b-5d4f-4852-bf65-f9395b169579)

#### 2 Factor Authentication Process

(Project brief criteria: 1. Login Page - 2 Factor Authentication)

- A 4 or 5 digit code will be sent to the email address used for sign in if it was the same one used to register. 
-	Staff member will use the code to sign in below.

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/953d9515-08a3-4b0c-a112-7b726868d322)

#### Admin Portal

Admin user will be met with all their personal and staff details, they will be able to choose from the following tasks to do:

-	Verify pending account applications.
-	Add new staff members to the system.
-	View and edit customer details. 
-	View a log of all successful logins.
-	Add a cash deposit to an account, Make transfers to and from any account

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/74c11cfe-6400-4c87-b4ea-d14ce6a048dd)

#### Verify Accounts

-	This will enable the staff to view all the pending customer applications waiting to be approved or declined and action them.
-	Admin staff can view the ID documentation provided and verify it against the information provided.

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/8a639155-d1bc-4c08-84b6-e93e9635009f)

#### Add Staff

(Project brief criteria: 6. Admin screen to add user)

-	Add new staff allows the staff (superusr/manager) to add new staff members with an @infosys.com email.

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/c89fca66-803f-4959-a707-044757ec736a)

#### View and edit customer details

(Project brief criteria: 3. Add/Edit details: Customer details, Address, Phone number)

-	Here admin staff can search customers by their user ID to view the details
-	Customers details on the system can be edited. 
-	Staff can view all the bank accounts held by that customer.
-	Bank accounts can be closed from here.

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/65bf6fa5-7889-458d-a71a-72416d37fb22)
![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/48739821-d6d7-48b4-be27-59915496a157)

#### System Login Audit

(Project brief criteria: 9. Audit log of login/events)

-	Everytime a staff member performs a successful login, it will be recorded here.
-	This page will only show transactions specific to the current use

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/bd92c827-806c-45e0-a1a1-1ffef7a4c719)

#### Deposit and transfer money to and from account

(Project brief criteria: 4. Add Money to the account & 5. Withdraw Money from the account)
 
-	Staff member can transfer money to an infosys bank (as a clerk within the bank on the assumption cash is being provided by the customer).
-	Funds can be transferred between two infosys bank accounts.
-	Funds can be transferred to external accounts held at other banks.

![image](https://github.com/DesignedByQ/BankingApp/assets/32695213/867fe040-a267-4198-9a88-0d0899591a36)

### FUTURE IMPROVEMENTS

-	UI to be more dynamic, possibly use framework templates.
-	Apply custom exception handling for back-end errors.
-	Add comments to code to guide external reviews or help decipher my own code.
-	Prevent unauthorized access to site pages via the search bar.
- Add encryption to passwords
-	Back buttons not all working

### CONTRIBUTORS

Henry Opara - Full Stack Software Engineer

GitHub: https://github.com/DesignedByQ

Linkedin: https://www.linkedin.com/in/henry-opara-81890a23/























  








