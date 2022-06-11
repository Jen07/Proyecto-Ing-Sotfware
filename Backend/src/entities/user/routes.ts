import { Router } from 'express';
import UserController from './controller';
import UserValidation from './validation';

const router: Router = Router();

router.get('/', UserController.getAll);

router.get('/:id', UserValidation.validateGet, UserController.getOne);
router.post('/', UserValidation.validatePost, UserController.post);
router.put('/:id', UserValidation.validatePut, UserController.put);
router.delete('/:id', UserValidation.validateGet, UserController.delete);

export default router;