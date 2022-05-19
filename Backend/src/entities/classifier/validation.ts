import { Request, Response, NextFunction } from "express";

export default class ClassifierValidation {

  static validateGet(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      return res.status(406).json({ status: 406, message: "No se encontró un id." });
    }

    next();
  }

  static validatePost(req: Request, res: Response, next: NextFunction) {
    // Si no es valido retorna
    if(!validateDescription(req,res)) return;

    next();
  }

  static validatePut(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      return res.status(406).json({ status: 406, message: "No se encontró un id." });
    }

    // Si no es valido retorna
    if(!validateDescription(req,res)) return;
  
    next();
  } 

}

const validateDescription = (req: Request, res: Response) => {
  if (!req.body.description) {
    res.status(406).json({ status: 406, message: "No se encontró una descripcion." });
    return false
  }

  if (req.body.description === ""){
    res.status(406).json({ status: 406, message: "La descripcion es invalida." });
    return false
  }

  return true;
}