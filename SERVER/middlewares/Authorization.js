/* eslint-disable camelcase */

/**
 * @exports
 * @class Authorization
 */
class Authorization {
    /**
     * Authorization
     * Verify TOKEN
     * @staticmethod
     * @param  {string} type - Request object
     * @return {string} res.json
     */
    static checkStaff(type) {
        return new Promise((resolve, reject) => {
            console.log(type);
            if (type === 'staff') {
                resolve('staff');
            }

            reject('client');
        });
    }

    static checkAdmin(is_admin) {
        return new Promise((resolve, reject) => {
            console.log(is_admin);
            if (is_admin === true) {
                resolve(true);
            }

            reject('false');
        });
    }
}


export default Authorization;