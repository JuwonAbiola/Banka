/* eslint-disable camelcase */
/* eslint-disable radix */
import moment from 'moment';
import db from '../connection/connect';

const obj = {};
const err = {};

class accountQuery {
  static saveAccountQuery(body, userId, email) {
    const {
      type,
      opening_balance,
    } = body;

    const d = new Date();
    console.log(`Logged-in User ${email}`);
    const account_number = Math.floor(Math.random() * 9000000000) + 1000000000;
    const created_on = moment(d).format('YYYY-MM-DD HH:mm:ss');
    const status = 'active';

    return new Promise((resolve, reject) => {
      const queryBody = `
INSERT INTO accounts (userId, account_number , created_on , type, opening_balance , status, email)
VALUES ('${userId}','${account_number}','${created_on}','${type}','${opening_balance}', '${status}', '${email}' ) RETURNING *`;
      db.query(queryBody)
        .then((result) => {
          if (result.rowCount >= 1) {
            resolve(result.rows[0]);
          } else if (result.rowCount === 0) {
            const response = 'Could Not Create Account';
            reject(response);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  static findUseraccountsQuery(accountnumber) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM accounts WHERE account_number = '${accountnumber}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            err.responseMessage = 'Account deleted Succesfully';
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

  static updateAccountQuery(accountnumber, status) {
    return new Promise((resolve, reject) => {
      const queryBody = `UPDATE accounts SET status = '${status}' WHERE account_number = '${accountnumber}'`;
      db.query(queryBody)
        .then((result) => {
          if (result.rowCount >= 1) {
            this.findUseraccountsQuery(accountnumber).then((response) => {
              resolve(response);
            }).catch((error) => {
              reject(error);
            });
          } else if (result.rowCount === 0) {
            const response = 'Account not found.';
            reject(response);
          }
        })
        .catch((e) => {
          const response = e;
          console.log(e);
          reject(response);
        });
    });
  }


  static deleteAccountQuery(accountnumber) {
    return new Promise((resolve, reject) => {
      const queryBody = `DELETE FROM accounts WHERE account_number = '${accountnumber}'`;
      db.query(queryBody)
        .then((result) => {
          if (result.rowCount >= 1) {
            this.findUseraccountsQuery(accountnumber).then((response) => {
              resolve(response);
            }).catch((error) => {
              reject(error);
            });
          } else if (result.rowCount === 0) {
            const response = 'Account not found.';
            reject(response);
          }
        })
        .catch((e) => {
          const response = e;
          console.log(e);
          reject(response);
        });
    });
  }
}

export default accountQuery;
