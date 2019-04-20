/* eslint-disable max-len */
/* eslint-disable radix */
import accounts from '../dummyData/account';
import users from '../dummyData/user';

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

  static emailCheck(req) {
    return new Promise(((resolve, reject) => {
      const account = users.find(user => user.email === req.body.email);

      if (account) {
        resolve(account);
      } else {
        reject(Error());
      }
    }));
  }
}

export default checker;
