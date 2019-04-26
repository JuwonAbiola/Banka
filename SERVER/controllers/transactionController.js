import TransactionService from '../services/TransactionService';

class transactions {
  static creditAccount(req, res) {
    const cashier = req.decoded.id;
    const { accountnumber } = req.params;
    const { amount } = req.body;
    TransactionService
      .creditAccount(accountnumber, amount, cashier)
      .then(response => res.status(200).json({
        status: 200,
        message: 'Account credited Successfully',
        data: response[0],
      }))
      .catch((err) => {
        console.log(err);
      });
  }

  static debitAccount(req, res) {
    const cashier = req.decoded.id;
    const { accountnumber } = req.params;
    const { amount } = req.body;
    TransactionService
      .debitAccount(accountnumber, amount, cashier)
      .then(response => res.status(200).json({
        status: 200,
        message: 'Account debited Successfully',
        data: response[0],
      }))
      .catch((err) => {
        console.log(err);
      });
  }

  static viewTransactions(req, res) {
    const { accountnumber } = req.params;
    console.log(`${accountnumber}`);
    TransactionService
      .viewTransactions(accountnumber)
      .then(result => res.status(200).json({
        status: 200,
        data: result.rows,
      }))
      .catch(err => res.status(400).json({
        status: 400,
        message: err,
      }));
  }

  static viewId(req, res) {
    const { id } = req.params;
    console.log(`${id}`);
    TransactionService
      .viewId(id)
      .then(result => res.status(200).json({
        status: 200,
        data: result.rows,
      }))
      .catch(err => res.status(400).json({
        status: 400,
        message: err,
      }));
  }
}

export default transactions;
