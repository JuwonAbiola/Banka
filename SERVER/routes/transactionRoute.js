import express from 'express';

import transactionController from '../controllers/transactionController';
import transactionMiddleware from '../middlewares/transactionMiddleware';
import TokenMiddleware from '../middlewares/TokenMiddleware';
import routeCheckMiddleware from '../middlewares/routeCheck';

const transactionRoute = express.Router();

const {
  debitAccount,
  creditAccount,
  viewTransactions,
  viewId,
} = transactionController;
const { validateTransaction } = transactionMiddleware;
const { verifyToken } = TokenMiddleware;
// const { verifyStaff, verifyAdmin } = routeCheckMiddleware;

transactionRoute.post('/accounts/:accountnumber/debit', verifyToken, validateTransaction, debitAccount);
transactionRoute.post('/accounts/:accountnumber/credit', verifyToken, validateTransaction, creditAccount);
transactionRoute.get('/accounts/:accountnumber/transactions', verifyToken, viewTransactions);
transactionRoute.get('/transactions/:id', verifyToken, viewId);


export default transactionRoute;
