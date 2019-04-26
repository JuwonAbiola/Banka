/* eslint-disable radix */
/* eslint-disable consistent-return */
import joi from 'joi';

/**
 * @exports
 * @class accountValidation
 */
class accountValidation {
  /**
     * accountValidation
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */

  static validateAccount(account) {
    const accountSchema = {
      type: joi.string().valid('saving', 'current'),
      opening_balance: joi.number().required(),
    };

    return joi.validate(account, accountSchema);
  }

  static validateUpdate(update) {
    const updateSchema = {
      status: joi.string().valid('active', 'dormant'),
    };

    return joi.validate(update, updateSchema);
  }
}

export default accountValidation;
