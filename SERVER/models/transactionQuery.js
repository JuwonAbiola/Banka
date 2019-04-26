/* eslint-disable camelcase */
/* eslint-disable radix */
import moment from 'moment';
import db from '../connection/connect';

class transactionQuery {
  static savetransactionQuery(new_balance, old_balance, cashier, accountnumber, amount, type) {
    const d = new Date();
    console.log(`Logged-in User ${new_balance}`);
    const created_on = moment(d).format('YYYY-MM-DD HH:mm:ss');

    return new Promise((resolve, reject) => {
      const queryBody = `
     INSERT INTO transactions (created_on ,type,account_number ,cashier, amount,  old_balance , new_balance)
     VALUES ('${created_on}','${type}','${accountnumber}','${cashier}','${amount}','${old_balance}', '${new_balance}' ) RETURNING *`;
      db.query(queryBody)
        .then((result) => {
          if (result.rowCount >= 1) {
            resolve(result.rows[0]);
          } else if (result.rowCount === 0) {
            const response = 'Could Not log Transaction';
            reject(response);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

export default transactionQuery;
