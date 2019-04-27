import Joi from 'joi';

class transactionValidation {
  static validateTransaction(transaction) {
    const transactionSchema = {
      type: Joi.string().valid('debit', 'credit'),
      accountNumber: Joi.string().min(5),
      amount: Joi.number().positive().min(5).required(),
      accountBalance: Joi.number(),
    };

    return Joi.validate(transaction, transactionSchema);
  }
}
export default transactionValidation;
