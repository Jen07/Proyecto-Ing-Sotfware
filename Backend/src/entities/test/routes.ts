import { Router } from 'express';
import TestController from './controller';
import TestValidation from './validation';

const router: Router = Router();

// Falta Paso 0 que es verificar mediante un middleware el token.
// Paso 1 Verifica en test validation que los datos sean validos. Considerar si dejara aca o fusionar con la controller.
// Paso 2 Envía a procesar la peticion a la controladora.
router.post('/', TestValidation.validate, TestController.getData);
 
export default router;