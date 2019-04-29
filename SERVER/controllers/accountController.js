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
        data: {
          accountNumber: result.account_number,
          firstName: req.decoded.firstname,
          lastName: req.decoded.lastname,
          email: req.decoded.email,
          type: result.type,
          openingBalance: result.opening_balance,
        },
      }))
      .catch(err => res.status(400).json({
        message: err,
      }));
  }

  static updateAccount(req, res) {
    const { accountnumber } = req.params;
    const { status } = req.body;
    AccountService
      .updateAccount(accountnumber, status)
      .then(response => res.status(200).json({
        status: 200,
        message: 'Account Updated Successfully',
        data: {
          accountNumber: response.rows[0].account_number,
          status: response.rows[0].status,
        },
      }))
      .catch(err => res.status(400).json({
        status: 400,
        message: err,
      }));
  }

  static deleteAccount(req, res) {
    const { accountnumber } = req.params;
    AccountService
      .deleteAccount(accountnumber)
      .then(response => res.status(400).json({
        status: 400,
        message: err,
      }))
      .catch(err => res.status(200).json({
        status: 200,
        message: 'Account Deleted Successfully',
      }));
  }

  static viewAccount(req, res) {
    const { email } = req.params;
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

  static viewAccountnum(req, res) {
    const { accountnumber } = req.params;
    console.log(accountnumber);
    AccountService
      .viewAccountnum(accountnumber)
      .then(result => res.status(200).json({
        status: 200,
        message: 'Account Details fetched Successfully',
        data: result.rows,
      }))
      .catch(err => res.status(400).json({
        status: 400,
        message: err,
      }));
  }

  static listAccount(req, res) {
    const { status } = req.query;
    if (status && !(['dormant', 'active'].includes(status))) {
      return res.status(400).json({
        status: 400,
        message: `${status} is an invalid status query`,
      });
    }

    if (status) {
      AccountService
        .listStatusAccount(status)
        .then(result => res.status(200).json({
          status: 200,
          data: result.rows,
        }))
        .catch(err => res.status(400).json({
          status: 400,
          message: err,
        }));
    } else {
      AccountService
        .listAccount()
        .then(result => res.status(200).json({
          status: 200,
          message: 'All accounts',
          data: result.rows,
        }))
        .catch(err => res.status(400).json({
          status: 400,
          message: err,
        }));
    }
  }
}

export default AccountController;
