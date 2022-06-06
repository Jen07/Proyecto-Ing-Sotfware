import { Router } from 'express';
import RequestController from './controller';
import RequestValidation from './validation';

const router: Router = Router();

router.post('/', RequestValidation.validateGet, RequestController.getUserRequests);

export default router;