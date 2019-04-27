import jwt from 'jsonwebtoken';
import config from '../config/index';
import passwordValidator from '../helpers/ComparePassword';
import queryProvider from '../models/userQuery';

/**
 * @exports
 * @class UserService
 */
class UserService {
  /**
     * Find user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */
  static findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      queryProvider
        .findUserByEmailQuery(email)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  /**
     * Find user by id
     * @staticmethod
     * @param  {string} id - Request object
     * @return {string} res
     */
  static findUserById(id) {
    return new Promise((resolve, reject) => {
      queryProvider
        .findUserByIdQuery(id)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  /**
     * save new user
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
  static saveUser(body) {
    return new Promise((resolve, reject) => {
      queryProvider
        .saveUserQuery(body)
        .then((response) => {
          const res = response[0];
          const token = jwt.sign(res, config.jwtSecretKey, {
            expiresIn: '24h',
          });
          const data = {
            status: 201,
            message: 'Registration successful',
            token,
            data: {
              id: res.id,
              firstName: res.firstname,
              lastName: res.lastname,
              email: res.email,
              type: res.type,
              isAdmin: res.is_admin,
            },
          };
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

  /**
     * updatePasswordByToken
     * @staticmethod
     * @param  {string} email - newpassword
     *  @param  {string} userpassword - token
     * @return {string} res
     */
  static validateUserLogin(email, userpassword) {
    return new Promise((resolve, reject) => {
      this.findUserByEmail(email)
        .then((res) => {
          const {
            password,
          } = res.rows[0];
          passwordValidator
            .compare(userpassword, password)
            .then(() => {
              const token = jwt.sign(res.rows[0], config.jwtSecretKey, {
                expiresIn: 86400,
              });
              const object = {
                firstname: res.rows[0].firstname,
                lastname: res.rows[0].lastname,
                email: res.rows[0].email,
                type: res.rows[0].type,
                is_admin: res.rows[0].is_admin,
              };
              const data = {
                status: 200,
                message: 'lOGIN Successful',
                data: object,
                token,
              };
              resolve(data);
            })
            .catch((err) => {
              const response = 'Wrong Password and Email Combination';
              reject(response);
            });
        })
        .catch((err) => {
          const response = 'Wrong Email and Password Combination. Please Check your credentials';
          reject(response);
        });
    });
  }
}

export default UserService;
