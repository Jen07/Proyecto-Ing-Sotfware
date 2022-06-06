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
const service_1 = __importDefault(require("./service"));
const service = new service_1.default();
class DepartmentController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service.getAll();
            res.status(data.status).json(data);
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service.getOne(parseInt(req.params.id));
            res.status(data.status).json(data);
        });
    }
    static post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service.post(parseInt(req.params.id), req.params.identification, req.body.name, req.body.surName, req.body.lastName, req.body.picture, req.body.birthdate, req.body.email, req.body.phone, req.body.password, req.body.id_sex, req.body.id_department, req.body.id_district);
            res.status(data.status).json(data);
        });
    }
    static put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service.put(parseInt(req.params.id), req.params.identification, req.body.name, req.body.surName, req.body.lastName, req.body.picture, req.body.birthdate, req.body.email, req.body.phone, req.body.password, req.body.id_sex, req.body.id_department, req.body.id_district);
            res.status(data.status).json(data);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service.delete(parseInt(req.params.id));
            res.status(data.status).json(data);
        });
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=controller.js.map