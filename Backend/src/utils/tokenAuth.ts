
import { Request, Response, NextFunction as Next } from "express";
import jwt from "jsonwebtoken"

export default class TokenAuth {
    /**
     * Este método genera un token para el usuario.
     *  
     * @param data Datos a agregar en el token
     * @param res  Respuesta al usuario
     */    
    static  getToken = async( data:any) => {
        const result : ServiceResult<any> = {status:200};
        
        return new Promise((res, rej) => {
            // Recibimos la data y creamos un token con la misma.
            jwt.sign({ data }, `${process.env.TOKEN_KEY}`, { expiresIn: '10h' }, (err, token) => {
                if (err) {
                    result.status = 404;
                    return res(result);
                } else {
                    result.item = token;
                    return res(result);
                }
                
            });
            
        })

    }
    
    /**
     * Este metodo se encarga de obtener un  
     * token del header y asignarlo a la request
     * 
     * @param req Solicitud del usuario
     * @param res Respuesta al usuario
     * @param next Paso a siguiente middleware
     */
     static recoverToken = (req:Request, res:Response, next:Next) => {
        // Obtener del lado del cliente los datos de authorization
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(403).json({status:403});
        }

        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
    
        // Al obtener el token correcto se ejecuta la función next
        next();
    }
    
    /**
     * Este metodo se encarga de verificar que el token asignado sea valido.
     * 
     * @param req Solicitud del usuario
     * @param res Respuesta al usuario
     * @param next Paso a siguiente middleware
    */
    static verifyToken = (req:Request, res:Response, next:Next) => {
       
        // La información de authData debe ser la enviada al getToken
        jwt.verify(req.token, `${process.env.TOKEN_KEY}`, (err:any, data:any) => {
          
            if (err) {
                return res.status(403).json({status:403});
            }
                    
            // Si el token es valido entonces se indica que el acceso es permitido
            req.token = data.dataBD;
            next();
                
        })
    }
}