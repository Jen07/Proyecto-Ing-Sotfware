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
class AttachmentController {
    //Listar Archivos
    static listAttachmentsRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.id_request);
            const data = yield service.getAll(req.body.id_request);
            res.status(data.status).json(data);
        });
    }
}
exports.default = AttachmentController;
//# sourceMappingURL=controller.js.map