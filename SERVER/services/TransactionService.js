/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
import queryProvider from '../models/transactionQuery';
import checker from '../helpers/checker';

class transactionService {
  static creditAccount(accountnumber, amount, cashier) {
    return new Promise((resolve, reject) => {
      checker.findUserByIdQuery(accountnumber)
        .then((res) => {
          const { opening_balance } = res.rows[0];
          const old_balance = opening_balance;
          const type = 'credit';
          const new_balance = Number(old_balance) + Number(amount);
          queryProvider
            .savetransactionQuery(new_balance, old_balance, cashier, accountnumber, amount, type)
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              const obj = {};
              obj.responseMessage = 'Insuficient balance';
              reject(obj);
            });
        })
        .catch((err) => {
          const obj = {};
          obj.responseMessage = 'Insuficient balance';
          reject(obj);
        });
    });
  }

  static debitAccount(accountnumber, amount, cashier) {
    return new Promise((resolve, reject) => {
      checker.findUserByIdQuery(accountnumber)
        .then((res) => {
          const { opening_balance } = res.rows[0];
          const old_balance = opening_balance;
          const type = 'debit';
          console.log(`oldb${old_balance}newb${amount}`);

          if (parseFloat(old_balance) < parseFloat(amount)) {
            return res.status(400).json({
              status: 400,
              err: 'Insuficient balance',
            });
          }

          const new_balance = Number(old_balance) - Number(amount);
          queryProvider
            .savetransactionQuery(new_balance, old_balance, cashier, accountnumber, amount, type)
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              const obj = {};
              obj.responseMessage = 'Insuficient balance';
              reject(obj);
            });
        })
        .catch((err) => {
          const obj = {};
          obj.responseMessage = 'Insuficient balance';
          reject(obj);
        });
    });
  }

  static viewTransactions(accountnumber) {
    return new Promise((resolve, reject) => {
      checker
        .findTransactionByAccountnumberQuery(accountnumber)
        .then((response) => {
          resolve(response);
        })
        .catch(err => reject(err));
    });
  }

  static viewId(id) {
    return new Promise((resolve, reject) => {
      checker
        .findTransactionByIdrQuery(id)
        .then((response) => {
          resolve(response);
        })
        .catch(err => reject(err));
    });
  }
}
export default transactionService;
