/* eslint-disable camelcase */
import sgMail from '@sendgrid/mail';
import config from '../config/index';
import queryProvider from '../models/query';


/**
 * @exports
 * @class NotificationService
 */
class NotificationService {
  /**
     * Find user by user_id and send Mail
     * @staticmethod
     * @param  {string} user_id - Request object
     * @return {string} res
     */
  static findUserById(user_id) {
    return new Promise((resolve, reject) => {
      queryProvider
        .findUserByIdQuery(user_id)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
     * @staticmethod
     * @param  {string} emailBody - Request object
     * @param  {string} host - Request object
     * @param  {string} user_id - Request object
     * @return {string} res
     */
  static sendMail(emailBody, host, user_id) {
    this.findUserById(user_id).then((res) => {
      const { firstname, email } = res.rows[0];
      sgMail.setApiKey(config.sendGridKey);
      const msg = {
        to: email,
        from: 'Banka 👻 <abiolaoluwajuwon@gmail.com>',
        subject: `Hi ${firstname}`,
        html: emailBody,
      };
      sgMail.send(msg);
    }).catch(() => {});
  }
}

export default NotificationService;
