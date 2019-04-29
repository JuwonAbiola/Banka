import queryProvider from '../models/accountQuery';
import checker from '../helpers/checker';

class accountService {
    /**
     * @staticmethod
     * @param  {string} body - Request object
     * @param  {string} userid - Request object
     * @return {string} res
     */
    static saveAccount(body, userId, email) {
        return new Promise((resolve, reject) => {
            queryProvider
                .saveAccountQuery(body, userId, email)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }

    static updateAccount(accountnumber, status) {
        return new Promise((resolve, reject) => {
            queryProvider
                .updateAccountQuery(accountnumber, status)
                .then((response) => {
                    resolve(response);
                })
                .catch(err => reject(err));
        });
    }

    static deleteAccount(accountnumber) {
        return new Promise((resolve, reject) => {
            queryProvider
                .deleteAccountQuery(accountnumber)
                .then((response) => {
                    resolve(response);
                })
                .catch(err => reject(err));
        });
    }


    static viewAccount(email) {
        return new Promise((resolve, reject) => {
            checker
                .findAccountByEmailQuery(email)
                .then((response) => {
                    resolve(response);
                })
                .catch(err => reject(err));
        });
    }

    static viewAccountnum(accountnumber) {
        return new Promise((resolve, reject) => {
            checker
                .viewAccountnum(accountnumber)
                .then((response) => {
                    resolve(response);
                })
                .catch(err => reject(err));
        });
    }

    static listAccount() {
        return new Promise((resolve, reject) => {
            checker
                .listAccount()
                .then((response) => {
                    resolve(response);
                })
                .catch(err => reject(err));
        });
    }

    static listStatusAccount(status) {
        return new Promise((resolve, reject) => {
            checker
                .listStatusAccountQuery(status)
                .then((response) => {
                    console.log(response);
                    console.log(status);

                    resolve(response);
                })
                .catch(err => reject(err));
        });
    }
}
export default accountService;