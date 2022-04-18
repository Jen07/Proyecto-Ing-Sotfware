import { Server } from './src/Server';

/**
 * Instancia del servidor
 */
const server:Server = new Server();

/**
 * Lanzamiento del servidor con captura de error si el puerto no se encuentra definido.
 */
try {
    server.launch();
} catch (ERR_SOCKET_BAD_PORT) {
  console.error("Error recovering port");
}