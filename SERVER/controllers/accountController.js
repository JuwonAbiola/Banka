/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
import moment from 'moment';
import accounts from '../dummyData/account';
import checker from '../helpers/checker';

/**
 * @exports
 * @class accountController
 */

class accountController {
  static createAccount(req, res) {
    checker.emailCheck(req)
      .then((result) => {
        result = {
          id: accounts.length + 1,
          accountNumber: Math.floor(Math.random() * 9000000000) + 1000000000,
          createdOn: moment().format('LL', 'hh:mm'),
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          type: req.body.type,
          openingBalance: req.body.openingBalance,
          status: 'active',
        };
        accounts.push(result);
        return res
          .status(201)
          .json({
            status: 201,
            message: 'Account created',
            data: result,
          });
      }, () => {
        return res.status(400).json({
          status: 400,
          error: 'sign up before creating account',
        });
      });
  }

  static updateAccount(req, res) {
    checker.accountnumCheck(req)
      .then((result) => {
        result.status = req.body.status;
        return res.status(200).json({
          status: 200,
          message: 'Account Updated',
          data: result,
        });
      }, () => {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      });
  }

  static deleteAccount(req, res) {
    checker.accountnumCheck(req)
      .then((result) => {
        const index = accounts.indexOf(result);
        accounts.splice(index);

        return res.status(200).json({
          status: 200,
          message: 'Account deleted',
        });
      }, () => {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      });
  }

  static listAccount(req, res) {
    return res
      .status(200)
      .json({
        status: 200,
        message: 'List of accounts',
        data: accounts,
      });
  }

  static singleAccount(req, res) {
    checker.accountnumCheck(req)
      .then((result) => {
        result.status = req.body.status;
        return res.status(200).json({
          status: 200,
          data: result,
        });
      }, () => {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      });
  }
}
export default accountController;
