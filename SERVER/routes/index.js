/* routes/index.js */
import express from 'express';
import userouter from './userRoute';
import accountouter from './accountRoute';
import transactionRoutes from './transactionRoute';


const router = express.Router();
router.use('/', userouter);
router.use('/', accountouter);
router.use('/', transactionRoutes);


export default router;
