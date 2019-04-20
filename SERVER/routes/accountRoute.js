import express from 'express';
import accountController from '../controllers/accountController';
import accountMiddleware from '../middlewares/accountMiddleware';

const accountroute = express.Router();

const {
  createAccount,
  updateAccount,
  deleteAccount,
  listAccount,
  singleAccount,
} = accountController;

const { validateAccount, validateUpdate } = accountMiddleware;

accountroute.post('/accounts', validateAccount, createAccount);
accountroute.get('/accounts/', listAccount);
accountroute.get('/accounts/:accountNumber', singleAccount);
accountroute.patch('/accounts/:accountNumber', validateUpdate, updateAccount);
accountroute.delete('/accounts/:accountNumber', deleteAccount);

export default accountroute;
