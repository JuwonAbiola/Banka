/* eslint-disable radix */
import moment from 'moment';
import accounts from '../dummyData/account';
import transactions from '../dummyData/transaction';

/**
 * @exports
 * @class accountController
 */

class transactionController {
  static debitAccount(req, res) {
    const accountNum = req.params.accountNumber;
    const account = accounts.find(num => num.accountNumber === parseInt(accountNum));
    if (!account) {
      return res.status(400).json({
        status: 400,
        error: 'Account not found',
      });
    }
    if (account.openingBalance < req.body.amount) {
      return res.status(400).json({
        status: 400,
        error: 'Insuficient balance',
      });
    }
    const accountBalance = account.openingBalance - req.body.amount;
    const transaction = {
      transactionId: transactions.length + 1,
      accountNumber: accountNum,
      amount: req.body.amount,
      cashier: req.body.cashier,
      transactionType: 'debit',
      date: moment().format('LL'),
      time: moment().format('hh:mm'),
      accountBalance: String(accountBalance),
    };
    account.openingBalance = accountBalance;
    accounts.push(account);
    transactions.push(transaction);
    return res.status(200).json({
      status: 200,
      data: transaction,
    });
  }

  static creditAccount(req, res) {
    const accountNum = req.params.accountNumber;
    const account = accounts.find(num => num.accountNumber === parseInt(accountNum));
    if (!account) {
      return res.status(400).json({
        status: 400,
        error: 'Account not found',
      });
    }
    const accountBalance = account.openingBalance + parseInt(req.body.amount);
    const transaction = {
      transactionId: transactions.length + 1,
      accountNumber: accountNum,
      amount: req.body.amount,
      cashier: req.body.cashier,
      transactionType: 'credit',
      date: moment().format('LL'),
      time: moment().format('hh:mm'),
      accountBalance: String(accountBalance),
    };
    account.openingBalance = accountBalance;
    accounts.push(account);
    transactions.push(transaction);

    return res.status(200).json({
      status: 200,
      data: transaction,
    });
  }
}

export default transactionController;
