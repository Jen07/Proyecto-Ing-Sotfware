"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./src/Server");
/**
 * Instancia del servidor
 */
const server = new Server_1.Server();
/**
 * Lanzamiento del servidor con captura de error si el puerto no se encuentra definido.
 */
try {
    server.launch();
}
catch (ERR_SOCKET_BAD_PORT) {
    console.error("Error recovering port");
}
//# sourceMappingURL=app.js.map