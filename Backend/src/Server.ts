import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

/**
 *  Esta clase contiene la configuracion necesaria para el
 *  lanzamiento del servidor
 */
export class Server {
  /**
   * Puerto por el cual se ejecutara el servidor especificado
   *  en las variables de entorno.
   */
  private port: Number | undefined;

  /**
   * Variable de express application.
   */
  private app: Application;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "");
    this.middlewares();
    this.routes();
  }

  /**
   * Este método se encarga de llamar los middleware necesarios
   */
  private middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.static("./app/public"));
  }

  /**
   * Este método se encarga de asignar el enrutamiento a cada uno
   * de los router por su endpoint.
   */
  private routes = () => {
    
  };

  /**
   * Este método se encarga de realizar le lanzamiento del servidor
   * en el puerto especificado en las variables de entorno.
   */
  public launch = () => {
    this.app.listen(this.port, () => console.log("Running on port", this.port));
  };
}
