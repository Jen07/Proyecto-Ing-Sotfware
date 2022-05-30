import { Router } from 'express';
import LoginController from './controller';
import Validation from './validation';

const router: Router = Router();

router.post('/', Validation.LoginValidation.validatePost, LoginController.post);
router.post('/secret', Validation.CodeValidation.codePost, LoginController.codePost);

export default router;