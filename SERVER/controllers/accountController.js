/* eslint-disable radix */
import moment from 'moment';
import accounts from '../dummyData/account';
import users from '../dummyData/user';

/**
 * @exports
 * @class accountController
 */

class accountController {
  static createAccount(req, res) {
    let account = users.find(user => user.email === req.body.email);
    if (!account) {
      return res.status(400).json({
        status: 400,
        error: 'Please sign up before creating account',
      });
    }

    account = {
      id: accounts.length + 1,
      accountNumber: Math.floor(Math.random() * 9000000000) + 1000000000,
      createdOn: moment().format('LL'),
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      type: req.body.type,
      openingBalance: req.body.openingBalance,
      status: 'active',
    };
    accounts.push(account);
    return res
      .status(201)
      .json({
        status: 201,
        message: 'Account created successfully',
        data: account,
      });
  }

  static updateAccount(req, res) {
    const account = accounts.find(acc => acc.accountNumber === parseInt(req.params.accountNumber));
    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'Account with the given account number is not found',
      });
    }


    account.status = req.body.status;
    return res.status(200).json({
      status: 200,
      message: 'Updated successfully',
      data: account,
    });
  }

  static deleteAccount(req, res) {
    const account = accounts.find(acc => acc.accountNumber === parseInt(req.params.accountNumber));
    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'Account with the given account number is not found',
      });
    }

    const index = accounts.indexOf(account);
    accounts.splice(index);

    return res.status(200).json({
      status: 200,
      message: 'Account successfulluy deleted',
    });
  }
}

export default accountController;
