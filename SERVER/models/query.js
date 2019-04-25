/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import moment from 'moment';
import db from '../connection/connect';

const saltRounds = 10;
const obj = {};
const err = {};

/**
 * @exports
 * @class queryProvider
 */
class queryProvider {
  /**
     * Find user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */
  static findUserByEmailQuery(email) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE email = '${email}'`;
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
        });
    });
  }

  /**
     * Find user by id
     * @staticmethod
     * @param  {string} id - Request object
     * @return {string} res
     */
  static findUserByIdQuery(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE id = '${id}'`;
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
        });
    });
  }

  /**
     * save new user
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
  static saveUserQuery(body) {
    const {
      firstname,
      lastname,
      email,
      password,
      is_admin,
      type,
    } = body;

    const d = new Date();
    const registered_at = moment(d).format('YYYY-MM-DD HH:mm:ss');

    return new Promise((resolve, reject) => {
      this.findUserByEmailQuery(email)
        .then((error) => {
          reject(error);
        })
        .catch(() => {
          bcrypt.hash(password, saltRounds).then((hash) => {
            const queryBody = `
                              INSERT INTO users(firstname, lastname, email, password, registered_at,type, is_admin)
                              VALUES ('${firstname}', '${lastname}', '${email}','${hash}','${registered_at}','${type}', '${is_admin}') returning * `;
            db.query(queryBody)
              .then((result) => {
                if (result.rowCount >= 1) {
                  resolve(result.rows);
                } else if (result.rowCount === 0) {
                  const response = 'Could Not Save User';
                  reject(response);
                }
              })
              .catch((e) => {
                reject(e);
              });
          });
        });
    });
  }

  /**
     * Delete user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */
  static deleteUserByEmailQuery(email) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM users WHERE email = '${email}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const message = 'user does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            const response = 'User Deleted';
            resolve(response);
          }
        })
        .catch((error) => {
          const messager = 'Error Finding User';
          reject(error);
        });
    });
  }
}

export default queryProvider;
