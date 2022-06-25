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
class RequestService extends abstractService_1.default {
    constructor() {
        super();
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const procedure = "sp_List_User_Requests";
            const inputData = [
                { name: "id", type: (0, mssql_1.VarChar)(9), data: `${id}` },
            ];
            const outputData = yield this.db.obtainData(procedure, inputData);
            if (outputData && (outputData === null || outputData === void 0 ? void 0 : outputData.returnValue) !== -1) {
                this.result = { status: 200, list: outputData.recordset };
            }
            else {
                this.result = { status: 200, list: [] };
            }
            return this.result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const procedure = "sp_Delete_Request";
            const inputData = [
                { name: "request_id", type: mssql_1.Int, data: id },
            ];
            const outputData = yield this.db.obtainData(procedure, inputData);
            if (outputData && (outputData === null || outputData === void 0 ? void 0 : outputData.returnValue) !== -1) {
                this.result = { status: 200, list: outputData.recordset };
            }
            else {
                this.result = { status: 200, list: [] };
            }
            return this.result;
        });
    }
    //Editar la solicitud para agregar los datos de la respuesta
    put(id_response_user, response_detail, id_legal_response, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const procedure = "sp_Update_Request";
            const inputData = [
                { name: "id_response_user", type: mssql_1.Int, data: id_response_user },
                { name: "response_detail", type: (0, mssql_1.VarChar)(60), data: response_detail },
                { name: "id_legal_response", type: mssql_1.TinyInt, data: id_legal_response },
                { name: "id", type: mssql_1.Int, data: id }
            ];
            const outputData = yield this.db.obtainData(procedure, inputData);
            if (outputData && (outputData === null || outputData === void 0 ? void 0 : outputData.returnValue) !== -1) {
                this.result = { status: 200 };
            }
            else {
                this.result = { status: 404, message: "Los datos no son válidos." };
            }
            return this.result;
        });
    }
    getAll(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const procedure = "sp_List_All_Requests";
            const outputData = yield this.db.obtainData(procedure);
            if (outputData && (outputData === null || outputData === void 0 ? void 0 : outputData.returnValue) !== -1) {
                this.result = { status: 200, list: outputData.recordset };
            }
            else {
                this.result = { status: 404, message: "Los datos no son válidos." };
            }
            return this.result;
        });
    }
    postRequest(user_id, issue, classifier, keyword, attachments) {
        return __awaiter(this, void 0, void 0, function* () {
            const procedure = "sp_Create_Request";
            const inputData = [
                { name: "user_id", type: mssql_1.Int, data: `${user_id}` },
                { name: "issue", type: (0, mssql_1.VarChar)(60), data: `${issue}` },
                { name: "classifier", type: mssql_1.SmallInt, data: `${classifier}` },
                { name: "keyword", type: (0, mssql_1.VarChar)(30), data: `${keyword}` },
                { name: "attachments", type: mssql_1.SmallInt, data: `${attachments}` },
            ];
            const outputData = yield this.db.obtainData(procedure, inputData);
            if (outputData && (outputData === null || outputData === void 0 ? void 0 : outputData.returnValue) !== -1) {
                this.result = { status: 200, item: outputData.recordset[0] };
            }
            else {
                this.result = { status: 404, message: "Los datos no son válidos." };
            }
            return this.result;
        });
    }
    postAttachment(request_id, line, file, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const procedure = "sp_Create_Attachment";
            const inputData = [
                { name: "request_id", type: mssql_1.Int, data: `${request_id}` },
                { name: "line", type: mssql_1.SmallInt, data: `${line}` },
                { name: "file", type: (0, mssql_1.VarChar)(mssql_1.MAX), data: `${file}` },
                { name: "comment", type: (0, mssql_1.VarChar)(50), data: `${comment}` }
            ];
            const outputData = yield this.db.obtainData(procedure, inputData);
            if (outputData && (outputData === null || outputData === void 0 ? void 0 : outputData.returnValue) !== -1) {
                this.result = { status: 200 };
            }
            else {
                this.result = { status: 404, message: "Los datos no son válidos." };
            }
            return this.result;
        });
    }
}
exports.default = RequestService;
//# sourceMappingURL=service.js.map