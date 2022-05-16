import Database from "../config/database";

/**
 * Servicio del cual extenderan otros servicios concretos.
 */
 export default class AbstractService{
 
   // Variable de acceso a la base de datos.
   protected db : Database;
 
   // Variable de retorno al cliente.
   protected result! : ServiceResult<any>;
 
   constructor(){
     this.result = {status: 200}
     this.db = Database.getInstance();
   }
 
 }