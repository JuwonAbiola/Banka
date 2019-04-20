/* eslint-disable no-param-reassign */
/* eslint-disable radix */
import moment from 'moment';
import accounts from '../dummyData/account';
import transactions from '../dummyData/transaction';
import checker from '../helpers/checker';
import users from '../dummyData/user';

/**
 * @exports
 * @class accountController
 */

class transactionController {
  static debitAccount(req, res) {
    checker.accountnumCheck(req)
      .then((result) => {
        if (result.openingBalance < req.body.amount) {
          return res.status(400).json({
            status: 400,
            error: 'Insuficient balance',
          });
        }
        const accountBalance = result.openingBalance - req.body.amount;
        const transaction = {
          transactionId: transactions.length + 1,
          accountNumber: req.params.accountNumber,
          amount: req.body.amount,
          cashier: req.decoded.id,
          transactionType: 'debit',
          date: moment().format('LL'),
          time: moment().format('hh:mm'),
          accountBalance: String(accountBalance),
        };
        result.openingBalance = accountBalance;
        accounts.push(result);
        transactions.push(transaction);
        return res.status(200).json({
          status: 200,
          data: transaction,
        });
      }, () => res.status(404).json({
        status: 404,
        error: 'Account not found',
      }));
  }

  static creditAccount(req, res) {
    checker.accountnumCheck(req)
      .then((result) => {
        if (result.status === 'dormant') {
          return res.status(400).json({
            status: 400,
            error: 'This account is Dormant',
          });
        }
        const accountBalance = result.openingBalance + parseInt(req.body.amount);
        const transaction = {
          transactionId: transactions.length + 1,
          accountNumber: req.params.accountNumber,
          amount: req.body.amount,
          cashier: req.decoded.id,
          transactionType: 'credit',
          date: moment().format('LL'),
          time: moment().format('hh:mm'),
          accountBalance: String(accountBalance),
        };
        result.openingBalance = accountBalance;
        accounts.push(result);
        transactions.push(transaction);
        return res.status(200).json({
          status: 200,
          data: transaction,
        });
      }, () => res.status(404).json({
        status: 404,
        error: 'Account not found',
      }));
  }
}

export default transactionController;
