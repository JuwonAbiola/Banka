/* routes/index.js */
import express from 'express';
import UserController from '../controllers/userController';
import accountController from '../controllers/accountController';
import transactionController from '../controllers/transactionController';

import UserMiddleware from '../middlewares/UserMiddleware';
import accountMiddleware from '../middlewares/accountMiddleware';
import transactionMiddleware from '../middlewares/transactionMiddleware';

const router = express.Router();
const { loginUser, registerUser } = UserController;
const {
  createAccount,
  updateAccount,
  deleteAccount,
  listAccount,
  singleAccount,
} = accountController;
const { debitAccount, creditAccount } = transactionController;
const { validateLogin, validateSignup } = UserMiddleware;
const { validateAccount, validateUpdate } = accountMiddleware;
const { validateTransaction } = transactionMiddleware;

// User Routes
router.post('/auth/signup', validateSignup, registerUser);
router.post('/auth/signin', validateLogin, loginUser);
router.post('/accounts', validateAccount, createAccount);

// Admin & Staff Routes
router.get('/accounts/', listAccount);
router.get('/accounts/:accountNumber', singleAccount);
router.patch('/accounts/:accountNumber', validateUpdate, updateAccount);
router.delete('/accounts/:accountNumber', deleteAccount);
router.post('/accounts/:accountNumber/debit', validateTransaction, debitAccount);
router.post('/accounts/:accountNumber/credit', validateTransaction, creditAccount);

export default router;
