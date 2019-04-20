import express from 'express';
import accountController from '../controllers/accountController';
import accountMiddleware from '../middlewares/accountMiddleware';
import TokenMiddleware from '../middlewares/TokenMiddleware';
import routeCheckMiddleware from '../middlewares/routeCheck';

const accountroute = express.Router();

const {
  createAccount,
  updateAccount,
  deleteAccount,
  listAccount,
  singleAccount,
} = accountController;
const { verifyToken } = TokenMiddleware;
const { verifyStaff, verifyAdmin } = routeCheckMiddleware;

const { validateAccount, validateUpdate } = accountMiddleware;

accountroute.post('/accounts', verifyToken, validateAccount, createAccount);
accountroute.get('/accounts/', verifyToken, verifyStaff || verifyAdmin, listAccount);
accountroute.get('/accounts/:accountNumber', verifyToken, verifyStaff || verifyAdmin, singleAccount);
accountroute.patch('/accounts/:accountNumber', verifyToken, verifyAdmin, validateUpdate, updateAccount);
accountroute.delete('/accounts/:accountNumber', verifyToken, verifyAdmin, deleteAccount);

export default accountroute;
