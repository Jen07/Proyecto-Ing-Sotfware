import { Request, Response, NextFunction } from "express";

export default class TestValidation{
    static validate(req: Request, res: Response, next: NextFunction){
        
        // Si los datos son invalidos retornar una respuesta y no ejecutar el next.
        next()
    }
}