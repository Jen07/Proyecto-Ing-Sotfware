"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenAuth_1 = __importDefault(require("../../utils/tokenAuth"));
const service_1 = __importDefault(require("./service"));
const service = new service_1.default();
class LoginController {
    static post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service.post(req.body.email, req.body.password);
            res.status(data.status).json(data);
        });
    }
    static codePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service.codePost(req.body.secret);
            res.status(data.status).json(data);
        });
    }
    static validateToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si paso por los 2 middleware el token es valido.
            res.status(200).json({ status: 200 });
        });
    }
    static getToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service.userGet(req.body.id);
            if (data.status !== 200) {
                return res.status(data.status).json(data);
            }
            const token = yield tokenAuth_1.default.getToken(data);
            res.status(data.status).json(token);
        });
    }
}
exports.default = LoginController;
//# sourceMappingURL=controller.js.map