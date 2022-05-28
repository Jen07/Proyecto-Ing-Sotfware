"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const validation_1 = __importDefault(require("./validation"));
const router = (0, express_1.Router)();
router.get('/country/', controller_1.default.getCountries);
router.get('/province/', controller_1.default.getProvinces);
router.get('/canton/', controller_1.default.getCantons);
router.get('/district/', controller_1.default.getDistricts);
router.get('/district/:id', validation_1.default.validateGet, controller_1.default.getOneDistrict);
exports.default = router;
//# sourceMappingURL=routes.js.map