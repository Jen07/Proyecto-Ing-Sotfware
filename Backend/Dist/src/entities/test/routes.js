"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const validation_1 = __importDefault(require("./validation"));
const router = (0, express_1.Router)();
// Falta Paso 0 que es verificar mediante un middleware el token.
// Paso 1 Verifica en test validation que los datos sean validos. Considerar si dejara aca o fusionar con la controller.
// Paso 2 Envía a procesar la peticion a la controladora.
router.post('/', validation_1.default.validate, controller_1.default.getData);
exports.default = router;
//# sourceMappingURL=routes.js.map