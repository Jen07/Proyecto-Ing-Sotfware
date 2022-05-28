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
const mssql_1 = __importDefault(require("mssql"));
/**
 *  Contiene configuracion de conexion a DB.
 */
class Database {
    constructor() {
        this.user = `${process.env.DB_USER}`;
        this.pass = `${process.env.DB_PASS}`;
        this.data = `${process.env.DB_DATA}`;
        this.serv = `${process.env.DB_SERV}`;
    }
    /**
     * Metodo de obtencion de configuracion de base de datos
     * @returns DBConfig
     */
    getConfig() {
        return {
            user: this.user,
            password: this.pass,
            server: this.serv,
            database: this.data,
            options: {
                trustServerCertificate: true,
            }
        };
    }
    /**
     * Párametro general de obtencion de datos.
     *
     * @param inputData Arreglo con datos de entrada para Procedures
     * @param procedure Nombre del procedimiento almacenado a utilizar
     * @returns Promise con el resultado o indefinida en caso de error
     */
    obtainData(procedure, inputData = []) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = null;
            let outputData;
            try {
                pool = yield mssql_1.default.connect(this.getConfig());
                const request = pool.request();
                inputData.forEach(field => request.input(field.name, field.type, field.data));
                const result = yield request.execute(procedure);
                outputData = result;
            }
            catch (err) {
                console.log(err);
            }
            finally {
                pool === null || pool === void 0 ? void 0 : pool.close();
            }
            return outputData;
        });
    }
    /**
     * Obtiene instancia unica de esta clase
     * @returns Database
     */
    static getInstance() {
        // Si la instancia a este punto no existe la crea
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map