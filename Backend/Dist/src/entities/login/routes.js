"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const validation_1 = __importDefault(require("./validation"));
const router = (0, express_1.Router)();
router.post('/', validation_1.default.validatePost, controller_1.default.post);
exports.default = router;
//# sourceMappingURL=routes.js.map