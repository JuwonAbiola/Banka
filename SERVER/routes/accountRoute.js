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
  viewAccount,
  // listAccount,
  // singleAccount,
} = accountController;
const { verifyToken } = TokenMiddleware;
const {
  // verifyStaff,
  verifyAdmin,
} = routeCheckMiddleware;

const {
  validateAccount,
  validateUpdate,
} = accountMiddleware;

accountroute.post('/accounts',
  verifyToken,
  validateAccount, createAccount);
// accountroute.get('/accounts/', verifyToken, verifyStaff || verifyAdmin, listAccount);
// accountroute.get('/accounts/:accountNumber', verifyToken, verifyStaff || verifyAdmin, singleAccount);
accountroute.patch('/accounts/:accountnumber', verifyToken, verifyAdmin, validateUpdate, updateAccount);
accountroute.delete('/accounts/:accountnumber', verifyToken, verifyAdmin, deleteAccount);
accountroute.get('/user/:email/accounts', verifyToken, viewAccount);


export default accountroute;
