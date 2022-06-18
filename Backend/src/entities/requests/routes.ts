import { Router } from 'express';
import RequestController from './controller';
import RequestValidation from './validation';

const router: Router = Router();

router.get('/', RequestController.getAllRequests);
router.post('/', RequestValidation.validateGet, RequestController.getUserRequests);

// TODO: VALIDAR BIEN EL POSTEO
router.post('/new', RequestValidation.validatePost, RequestController.postNewRequests);

export default router;