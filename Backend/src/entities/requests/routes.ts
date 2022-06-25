import { Router } from 'express';
import RequestController from './controller';
import RequestValidation from './validation';

const router: Router = Router();

router.get('/', RequestController.getAllRequests);
router.post('/', RequestValidation.validateGet, RequestController.getUserRequests);
router.delete('/:id', RequestValidation.validateGet, RequestController.deleteRequest);

router.post('/new', RequestValidation.validatePost, RequestController.postNewRequests);
router.put('/edit', RequestValidation.validateEdit, RequestController.putRequest);



export default router;