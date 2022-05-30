import { Router } from 'express';
import TokenAuth from '../../utils/tokenAuth';
import LoginController from './controller';
import Validation from './validation';

const router: Router = Router();

router.post('/', Validation.LoginValidation.validatePost, LoginController.post);
router.post('/secret', Validation.CodeValidation.codePost, LoginController.codePost);

router.get('/validate_token', TokenAuth.recoverToken,TokenAuth.verifyToken, LoginController.validateToken);
router.post('/get_token',  LoginController.getToken);

export default router;