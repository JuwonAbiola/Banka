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
    viewAccountnum,
    listAccount,

    // listAccount,
    // singleAccount,
} = accountController;
const { verifyToken } = TokenMiddleware;
const {
    verifyStaff,
    verifyAdmin,
} = routeCheckMiddleware;

const {
    validateAccount,
    validateUpdate,
} = accountMiddleware;

accountroute.post('/accounts', verifyToken, validateAccount, createAccount);
accountroute.get('/accounts/', verifyToken, verifyAdmin || verifyStaff, listAccount);
accountroute.patch('/accounts/:accountnumber([0-9]+)', verifyToken, verifyAdmin || verifyStaff, validateUpdate, updateAccount);
accountroute.delete('/accounts/:accountnumber([0-9]+)', verifyToken, verifyToken, verifyAdmin, deleteAccount);
accountroute.get('/accounts/:accountnumber([0-9]+)', verifyToken, viewAccountnum);
accountroute.get('/user/:email/accounts', verifyToken, verifyToken, verifyAdmin || verifyStaff, viewAccount);

export default accountroute;