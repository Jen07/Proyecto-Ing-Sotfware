"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./entities/test/routes"));
const routes_2 = __importDefault(require("./entities/classifier/routes"));
const routes_3 = __importDefault(require("./entities/department/routes"));
const routes_4 = __importDefault(require("./entities/localization/routes"));
const routes_5 = __importDefault(require("./entities/login/routes"));
const routes_6 = __importDefault(require("./entities/requests/routes"));
/**
 *  Esta clase contiene la configuracion necesaria para el
 *  lanzamiento del servidor
 */
class Server {
    constructor() {
        /**
         * Este método se encarga de asignar el enrutamiento a cada uno
         * de los router por su endpoint.
         */
        this.routes = () => {
            this.app.use('/test', routes_1.default);
            this.app.use('/classifier', routes_2.default);
            this.app.use('/department', routes_3.default);
            this.app.use('', routes_4.default);
            this.app.use('/login', routes_5.default);
            this.app.use('/requests', routes_6.default);
        };
        /**
         * Este método se encarga de realizar le lanzamiento del servidor
         * en el puerto especificado en las variables de entorno.
         */
        this.launch = () => {
            this.app.listen(this.port, () => console.log("Running on port", this.port));
        };
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || "");
        this.middlewares();
        this.routes();
    }
    /**
     * Este método se encarga de llamar los middleware necesarios
     */
    middlewares() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.static("./app/public"));
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map