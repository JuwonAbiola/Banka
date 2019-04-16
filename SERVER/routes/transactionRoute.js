import express from 'express';

import transactionController from '../controllers/transactionController';
import transactionMiddleware from '../middlewares/transactionMiddleware';

const transactionRoute = express.Router();

const { debitAccount, creditAccount } = transactionController;
const { validateTransaction } = transactionMiddleware;
transactionRoute.post('/accounts/:accountNumber/debit', validateTransaction, debitAccount);
transactionRoute.post('/accounts/:accountNumber/credit', validateTransaction, creditAccount);

export default transactionRoute;
