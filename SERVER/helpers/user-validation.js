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
            firstname: joi
                .string().trim().regex(/^[A-Za-z]*$/).error(() => 'please enter a valid First name not less than 3 letters')
                .min(3)

                .required(),

            lastname: joi
                .string().trim().regex(/^[A-Za-z]*$/).error(() => 'please enter a valid Last name not less than 3 letters')
                .min(3)
                .required(),
            email: joi
                .string()
                .email()
                .trim()
                .required(),
            type: joi.string().valid('client', 'staff').required(),
            is_admin: joi.boolean().required(),
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