import express from 'express';
import UserController from '../controllers/userController';
import UserMiddleware from '../middlewares/UserMiddleware';

const userouter = express.Router();

const {
  loginUser,
  createUser,
} = UserController;
const {
  validateLogin,
  validateSignup,
} = UserMiddleware;

userouter.post('/auth/signup', validateSignup, createUser);
userouter.post('/auth/signin', validateLogin, loginUser);

export default userouter;
