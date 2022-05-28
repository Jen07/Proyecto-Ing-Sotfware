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
class TestService extends abstractService_1.default {
    constructor() {
        super();
    }
    getData(id, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const procedure = "sp_GetTest";
            const inputData = [
                { name: "id", type: mssql_1.Int, data: id },
                { name: "description", type: (0, mssql_1.VarChar)(mssql_1.MAX), data: description },
            ];
            const outputData = yield this.db.obtainData(procedure, inputData);
            if (outputData && (outputData === null || outputData === void 0 ? void 0 : outputData.returnValue) !== -1) {
                this.result = { status: 200, message: "Los datos son válidos.", item: outputData.recordset[0] };
            }
            else {
                this.result = { status: 404, message: "Los datos no son válidos." };
            }
            return this.result;
        });
    }
}
exports.default = TestService;
/*
    Este es el SP para esta prueba.

    GO
      CREATE OR ALTER PROCEDURE sp_GetTest
      @id INT,
      @description VARCHAR(MAX)
      AS
      BEGIN
          SET NOCOUNT ON
          BEGIN TRANSACTION
              BEGIN TRY
                      SELECT @id as [id], @description as [description]
                      
                      IF @@ROWCOUNT = 0
                      THROW 51000, 'The test is incorrect.', 1;

                  IF @@TRANCOUNT > 0
                      BEGIN
                      COMMIT TRANSACTION;
                      RETURN 1;
                      END
              END TRY

              BEGIN CATCH
                  IF @@TRANCOUNT > 0
                          BEGIN
                          ROLLBACK TRANSACTION;
                          SELECT ERROR_MESSAGE() AS ErrorMessage;
                          RETURN -1;
                          END
              END CATCH
      END

*/ 
//# sourceMappingURL=service.js.map