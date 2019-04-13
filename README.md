[![Coverage Status](https://coveralls.io/repos/github/oluwajhay/Banka/badge.svg?branch=ch-create-dummy-data-endpoints-165307084)](https://coveralls.io/github/oluwajhay/Banka?branch=ch-create-dummy-data-endpoints-165307084)

[![Maintainability](https://api.codeclimate.com/v1/badges/fdd4247c44db13d3e088/maintainability)](https://codeclimate.com/github/oluwajhay/Banka/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/fdd4247c44db13d3e088/test_coverage)](https://codeclimate.com/github/oluwajhay/Banka/test_coverage)
# Banka

Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals.

## Access running application

* [UI](https://oluwajhay.github.io/Banka/UI/index.html)<br>
* [Pivotal Tracker Board](https://www.pivotaltracker.com/n/projects/2320527)

### Required Features
* Users can create an sign up and log in.
* Users can create bank account.
* Users can view account transaction history.
* Users can view specific account transaction.
* Staff can debit and credit user account.
* Admin/staff can view all user accounts.
* Admin/staff can view a specific user account.
* Admin/staff can activate or deactivate an account.
* Admin/staff can delete a specific account.
* Admin can create staff and admin user accounts.


## Getting Started
Instructions to get the project running successfully on your website

## Prerequisites
You need to have these installed before cloning the project
* NodeJS (atleast v8.11.2) - https://nodejs.org/en/download/

## Technologies Used
- [Eslint](https://eslint.org/)
- [Nodejs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Coveralls](https://coveralls.io/)
- [Babel](https://babeljs.io/)

## Coding Style
[Airbnb JavaScript style guide](https://github.com/airbnb/javascript)


## Installation

```bash
git clone https://github.com/oluwajhay/Banka.git
```

```bash
cd Banka
```

```bash
npm install
```

```bash
npm start
```

## Test

Testing is used at key checkpoints in the overall process to determine whether objectives are being met. It also speed up software development process

<h3>ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/signup</td>
      <td>Create user account</td>
  </tr>
 <tr>
      <td>POST</td>
      <td>/api/v1/auth/signin</td>
      <td>Login a user</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/accounts</td>
      <td>Create a bank account</td>
  </tr>
  <tr>
        <td>PATCH</td>
        <td>/api/v1//accounts/:accountNumber</td>
        <td>Activate or deactivate an account</td>
  </tr>
  <tr>
        <td>DELETE</td>
        <td>/api/v1/accounts/:accountNumber</td>
        <td>Delete a bank account </td>
  </tr>
   <tr>
        <td>POST</td>
        <td>/api/v1/accounts/:accountNumber/debit</td>
        <td>Debit a bank account</td>
  </tr>
   <tr>
        <td>POST</td>
        <td>/api/v1/accounts/:accountNumber/credit</td>
        <td>Credit a bank account</td>
  </tr>
 

</table>
<br>

## License
This project is licensed under the MIT License 

## Author
[Abiola Oluwajuwon](https://github.com/oluwajhay)

## Acknowledgements
[Andela](https://andela.com)<br>
[Scotch.io](https://scotch.io)<br>
[FreeCodeCamp](https://medium.freecodecamp.com)<br>
[Google](https://google.com)<br>
[GTBank](https://gtbank.com)<br>