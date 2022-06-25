import { Router } from 'express';
import RequestController from './controller';

const router: Router = Router();


router.post('/list', RequestController.listAttachmentsRequest);

export default router;