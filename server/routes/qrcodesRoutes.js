import Router from 'express';
import { createQRCode, updateFamily } from '../controllers/qrcodesControllers.js';

const router = Router();

router.post('/create',createQRCode);

router.post('/updateFamily',updateFamily)

export default router;