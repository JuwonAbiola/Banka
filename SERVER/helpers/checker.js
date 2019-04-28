/* eslint-disable max-len */
/* eslint-disable radix */
import db from '../connection/connect';

const obj = {};
const err = {};
/**
 * @exports
 * @class checker
 */
class checker {
  /**
     * accountValidation
     * @staticmethod
     * @param  {object} req - Request object
     */

  static accountnumCheck(req) {
    return new Promise(((resolve, reject) => {
      const account = accounts.find(num => num.accountNumber === parseInt(req.params.accountNumber));

      if (account) {
        resolve(account);
      } else {
        reject(Error());
      }
    }));
  }

  static findUserByIdQuery(accountnumber) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM accounts WHERE account_number = '${accountnumber}'`;
      console.log(accountnumber);
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            err.responseMessage = 'Account does not exist';
            console.log(err);
            reject(err);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.responseMessage = 'Error Finding All User accounts';
          err.responseCode = '02';
          reject(err);
        });
    });
  }


  static findUserByEmailQuery(email) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE email = '${email}' returning *`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            err.responseMessage = 'user does not exist';
            err.responseCode = '01';
            reject(err);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.responseMessage = 'Error Finding User';
          err.responseCode = '02';
          reject(err);
          console.log(err);
        });
    });
  }

  static findAccountByEmailQuery(email) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM accounts WHERE email = '${email}'`;
      db.query(query)
        .then((result) => {
          // console.log(result);
          if (result.rowCount === 0) {
            err.responseMessage = 'No account found';
            err.responseCode = '01';
            reject(err);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.responseMessage = 'Error Finding accounts';
          err.responseCode = '02';
          reject(err);
        });
    });
  }

  static findTransactionByAccountnumberQuery(accountnumber) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM transactions WHERE account_number = '${accountnumber}'`;
      db.query(query)
        .then((result) => {
          // console.log(result);
          if (result.rowCount === 0) {
            err.responseMessage = 'No transaction found';
            err.responseCode = '01';
            reject(err);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.responseMessage = 'Error Finding transactions';
          err.responseCode = '02';
          reject(err);
        });
    });
  }

  static findTransactionByIdrQuery(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM transactions WHERE id = '${id}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            err.responseMessage = 'No transaction found';
            err.responseCode = '01';
            reject(err);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.responseMessage = 'Error Finding transaction';
          err.responseCode = '02';
          reject(err);
        });
    });
  }


  static viewAccountnum(accountnumber) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM accounts WHERE account_number = '${accountnumber}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            err.responseMessage = 'Account info not found';
            err.responseCode = '01';
            reject(err);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.responseMessage = 'Error Finding transactions';
          err.responseCode = '02';
          reject(err);
        });
    });
  }

  static listAccount() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM accounts';
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            err.responseMessage = 'No account found';
            err.responseCode = '01';
            reject(err);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.responseMessage = 'Error Finding account';
          err.responseCode = '02';
          reject(err);
        });
    });
  }


  static listStatusAccountQuery(status) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM accounts WHERE status = '${status}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            err.responseMessage = `No ${status} account found`;
            err.responseCode = '01';
            reject(err);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.responseMessage = 'Error Finding account';
          err.responseCode = '02';
          reject(err);
        });
    });
  }
}

export default checker;
