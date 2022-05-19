import { Router } from 'express';
import ClassifierController from './controller';
import ClassifierValidation from './validation';

const router: Router = Router();

router.get('/', ClassifierController.getAll);
router.get('/:id', ClassifierValidation.validateGet, ClassifierController.getOne);
router.post('/', ClassifierValidation.validatePost, ClassifierController.post);
router.put('/:id', ClassifierValidation.validatePut, ClassifierController.put);
router.delete('/:id', ClassifierValidation.validateGet, ClassifierController.delete);

export default router;