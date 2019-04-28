/* eslint-disable camelcase */
import Authorization from './Authorization';

class routeCheckMiddleware {
    /**
     * ParcelMiddleware
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */
    /**
     * ParcelMiddleware
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */
    static verifyStaff(req, res, next) {
        const { type } = req.decoded;
        Authorization.checkStaff(type).then(() => next()).catch(() => res.status(403).json({
            status: 403,
            message: 'User cannot Visit this route',
        }));
    }

    static verifyAdmin(req, res, next) {
        const { is_admin } = req.decoded;
        Authorization.checkAdmin(is_admin).then(() => next()).catch(() => res.status(403).json({
            status: 403,
            message: 'User cannot Visit this route',
        }));
    }
}

export default routeCheckMiddleware;