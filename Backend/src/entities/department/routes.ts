import { Router } from 'express';
import DepartmentController from './controller';
import DepartmentValidation from './validation';

const router: Router = Router();

router.get('/', DepartmentController.getAll);

router.get('/:id', DepartmentValidation.validateGet, DepartmentController.getOne);
router.post('/', DepartmentValidation.validatePost, DepartmentController.post);
router.put('/:id', DepartmentValidation.validatePut, DepartmentController.put);
router.delete('/:id', DepartmentValidation.validateGet, DepartmentController.delete);

export default router;