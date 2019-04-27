/* eslint-disable camelcase */
/* eslint-disable radix */
import moment from 'moment';
import db from '../connection/connect';

class transactionQuery {
  static savetransactionQuery(new_balance, old_balance, cashier, accountnumber, amount, type) {
    const d = new Date();
    const created_on = moment(d).format('YYYY-MM-DD HH:mm:ss');

    return new Promise((resolve, reject) => {
      const queryBody = `
     INSERT INTO transactions (created_on ,type,account_number ,cashier, amount,  old_balance , new_balance)
     VALUES ('${created_on}','${type}','${accountnumber}','${cashier}','${amount}','${old_balance}', '${new_balance}' ) RETURNING *`;

      const queryUpdate = `UPDATE accounts SET opening_balance = '${new_balance}' WHERE account_number = '${accountnumber}'`;

      db.query(queryBody)
        .then((result) => {
          if (result.rowCount >= 1) {
            resolve(result.rows[0]);
          } else if (result.rowCount === 0) {
            const response = 'Could Not log Transaction';
            reject(response);
          }
          db.query(queryUpdate)
            .then((res) => {
              if (res.rowCount >= 1) {
                resolve(res.rows[0]);
              } else if (res.rowCount === 0) {
                const response = 'Could Not Update account Balance';
                reject(response);
              }
            })
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

export default transactionQuery;
