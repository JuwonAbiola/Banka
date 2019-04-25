/* routes/index.js */
import express from 'express';
import userouter from './userRoute';


const router = express.Router();
router.use('/', userouter);


export default router;
