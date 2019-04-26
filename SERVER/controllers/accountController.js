import AccountService from '../services/AccountService';

/**
 * @exports
 * @class AccountController
 */

class AccountController {
  static createAccount(req, res) {
    const userId = req.decoded.id;
    const { email } = req.decoded;
    AccountService
      .saveAccount(req.body, userId, email)
      .then(result => res.status(201).json({
        status: 201,
        message: 'Account created successfully',
        accountNumber: result.account_number,
        firstName: req.decoded.firstname,
        lastName: req.decoded.lastname,
        email: req.decoded.email,
        type: req.decoded.type,
        openingBalance: result.opening_balance,
      }))
      .catch(err => res.status(400).json({
        message: err,
      }));
  }

  static updateAccount(req, res) {
    const { accountnumber } = req.params;
    const { status } = req.body;
    console.log(`${accountnumber}${status}`);
    AccountService
      .updateAccount(accountnumber, status)
      .then(response => res.status(200).json({
        status: 200,
        message: 'Account Updated Successfully',
        data: response[0],
      }))
      .catch(err => res.status(400).json({
        status: 400,
        message: err,
      }));
  }

  static deleteAccount(req, res) {
    const { accountnumber } = req.params;
    console.log(`${accountnumber}`);
    AccountService
      .deleteAccount(accountnumber)
      .then(response => res.status(200).json({
        status: 200,
        message: 'Account Deleted Successfully',
        data: response[0],
      }))
      .catch(err => res.status(400).json({
        status: 400,
        message: err,
      }));
  }

  static viewAccount(req, res) {
    const { email } = req.params;
    console.log(`${email}`);
    AccountService
      .viewAccount(email)
      .then(result => res.status(200).json({
        status: 200,
        data: result.rows,
      }))
      .catch(err => res.status(400).json({
        status: 400,
        message: err,
      }));
  }
}

export default AccountController;
