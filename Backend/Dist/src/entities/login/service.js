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
const mssql_1 = require("mssql");
const abstractService_1 = __importDefault(require("../../utils/abstractService"));
const doubleAuth_1 = __importDefault(require("../../utils/doubleAuth"));
class LoginService extends abstractService_1.default {
    constructor() {
        super();
    }
    post(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const procedure = "sp_Login";
            const inputData = [
                { name: "email", type: (0, mssql_1.VarChar)(50), data: email },
                { name: "password", type: (0, mssql_1.VarChar)(12), data: password },
            ];
            const outputData = yield this.db.obtainData(procedure, inputData);
            if (outputData && (outputData === null || outputData === void 0 ? void 0 : outputData.returnValue) !== -1) {
                this.result = { status: 200 }; //enviar datos del user outputData?.recordset
            }
            else {
                this.result = { status: 404, message: "Los datos no son válidos." };
            }
            return this.result;
        });
    }
    codePost(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const procedure = "sp_VerifyCode";
            const inputData = [
                { name: "id", type: mssql_1.Int, data: 979020 }, //quedamo cedula ver despues
            ];
            const outputData = yield this.db.obtainData(procedure, inputData);
            var secret = outputData === null || outputData === void 0 ? void 0 : outputData.recordset[0].secret; //validar haya un secret
            const verify = doubleAuth_1.default.verifySecret(secret, code);
            if (verify) {
                this.result = { status: 200 };
            }
            else {
                this.result = { status: 404, message: "Los datos no son válidos." };
            }
            return this.result;
        });
    }
}
exports.default = LoginService;
//# sourceMappingURL=service.js.map