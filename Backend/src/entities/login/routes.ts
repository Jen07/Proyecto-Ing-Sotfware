import { Router } from 'express';
import LoginController from './controller';
import LoginValidation from './validation';

const router: Router = Router();

router.post('/', LoginValidation.validatePost, LoginController.post);

export default router;