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
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static debitAccount(accountnumber, amount, cashier) {
    return new Promise((resolve, reject) => {
      checker.findUserByIdQuery(accountnumber)
        .then((res) => {
          const { opening_balance } = res.rows[0];
          const old_balance = opening_balance;
          if (Number(old_balance) < Number(amount)) {
            return res.status(400).json({
              status: 400,
              error: 'Insuficient balance',
            });
          }
          const type = 'debit';
          const new_balance = Number(old_balance) - Number(amount);
          queryProvider
            .savetransactionQuery(new_balance, old_balance, cashier, accountnumber, amount, type)
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
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
