"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
/**
 * Servicio del cual extenderan otros servicios concretos.
 */
class AbstractService {
    constructor() {
        this.result = { status: 200 };
        this.db = database_1.default.getInstance();
    }
}
exports.default = AbstractService;
//# sourceMappingURL=abstractService.js.map