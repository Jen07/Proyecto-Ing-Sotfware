"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenAuth_1 = __importDefault(require("../../utils/tokenAuth"));
const controller_1 = __importDefault(require("./controller"));
const validation_1 = __importDefault(require("./validation"));
const router = (0, express_1.Router)();
router.post('/', validation_1.default.LoginValidation.validatePost, controller_1.default.post);
router.post('/secret', validation_1.default.CodeValidation.codePost, controller_1.default.codePost);
router.get('/validate_token', tokenAuth_1.default.recoverToken, tokenAuth_1.default.verifyToken, controller_1.default.validateToken);
router.post('/get_token', controller_1.default.getToken);
router.post('/get_picture', controller_1.default.getPicture);
exports.default = router;
//# sourceMappingURL=routes.js.map