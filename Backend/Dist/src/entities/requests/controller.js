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
class ClassifierController {
    static getUserRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service.getUser(req.body.id);
            res.status(data.status).json(data);
        });
    }
    static getAllRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service.getAll(req.body.id);
            res.status(data.status).json(data);
        });
    }
    static deleteRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service.delete(parseInt(req.params.id));
            res.status(data.status).json(data);
        });
    }
    static postNewRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield service.postRequest(req.body.user_id, req.body.issue, req.body.classifier, req.body.keyword, req.body.attachments.length);
            if (req.body.attachments.length > 0) {
                req.body.attachments.forEach((file, index) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    yield service.postAttachment(((_a = data.item) === null || _a === void 0 ? void 0 : _a.id) || 0, index, file.data, file.name);
                }));
            }
            res.json("");
        });
    }
}
exports.default = ClassifierController;
//# sourceMappingURL=controller.js.map