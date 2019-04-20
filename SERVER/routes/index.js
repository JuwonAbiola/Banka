/* routes/index.js */
import express from 'express';
import userouter from './userRoute';
import accountroute from './accountRoute';
import transactionRoutes from './transactionRoute';

const router = express.Router();
router.use('/', userouter);
router.use('/', accountroute);
router.use('/', transactionRoutes);

export default router;
