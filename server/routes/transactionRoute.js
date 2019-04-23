import express from 'express';

import transactionController from '../controllers/transactionController';
import transactionMiddleware from '../middlewares/transactionMiddleware';
import TokenMiddleware from '../middlewares/TokenMiddleware';
import routeCheckMiddleware from '../middlewares/routeCheck';

const transactionRoute = express.Router();

const { debitAccount, creditAccount } = transactionController;
const { validateTransaction } = transactionMiddleware;
const { verifyToken } = TokenMiddleware;
const { verifyStaff, verifyAdmin } = routeCheckMiddleware;

transactionRoute.post('/accounts/:accountNumber/debit', verifyToken, verifyStaff || verifyAdmin, validateTransaction, debitAccount);
transactionRoute.post('/accounts/:accountNumber/credit', verifyToken, verifyStaff || verifyAdmin, validateTransaction, creditAccount);

export default transactionRoute;
