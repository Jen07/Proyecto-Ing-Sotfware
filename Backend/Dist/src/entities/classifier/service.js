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
class ClassifierService extends abstractService_1.default {
    constructor() {
        super();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const procedure = "sp_List_Classifiers";
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
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const procedure = "sp_Get_Classifier";
            const inputData = [
                { name: "id", type: mssql_1.SmallInt, data: id },
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
    post(description) {
        return __awaiter(this, void 0, void 0, function* () {
            const procedure = "sp_Create_Classifier";
            const inputData = [
                { name: "description", type: (0, mssql_1.VarChar)(50), data: description },
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
    put(id, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const procedure = "sp_Update_Classifier";
            const inputData = [
                { name: "id", type: mssql_1.SmallInt, data: id },
                { name: "description", type: (0, mssql_1.VarChar)(50), data: description },
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
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const procedure = "sp_Delete_Classifier";
            const inputData = [
                { name: "id", type: mssql_1.SmallInt, data: id },
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
exports.default = ClassifierService;
//# sourceMappingURL=service.js.map