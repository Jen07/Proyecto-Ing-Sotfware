import { Router } from 'express';
import LocalController from './controller';
import LocalValidation from './validation';

const router: Router = Router();

router.get('/country/', LocalController.getCountries);
router.get('/province/', LocalController.getProvinces);
router.get('/canton/', LocalController.getCantons);
router.get('/district/', LocalController.getDistricts);
router.get('/district/:id', LocalValidation.validateGet, LocalController.getOneDistrict);


export default router;