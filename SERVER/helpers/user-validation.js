import joi from 'joi';
/**
 * @exports
 * @class UserMiddleware
 */
class userValidation {
  /**
     * UserMiddleware
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */

  static validateUser(user) {
    const userSchema = {
      firstName: joi
        .string().regex(/^[A-Za-z]*$/).error(() => 'please enter a valid First name not less than 3 letters')
        .min(3)
        .trim()
        .required(),

      lastName: joi
        .string().regex(/^[A-Za-z]*$/).error(() => 'please enter a valid Last name not less than 3 letters')
        .min(3)
        .trim()
        .required(),
      email: joi
        .string()
        .email()
        .trim()
        .required(),
      phone: joi
        .number()
        .min(1)
        .max(11),
      password: joi
        .string()
        .min(6)
        .max(12)
        .trim()
        .required(),
    };
    return joi.validate(user, userSchema);
  }

  static validateLogin(user) {
    const login = {
      email: joi
        .string()
        .email()
        .trim()
        .required(),
      password: joi
        .string()
        .min(6)
        .trim()
        .required(),
    };
    return joi.validate(user, login);
  }
}

export default userValidation;
