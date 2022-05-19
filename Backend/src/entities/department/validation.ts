import { Request, Response, NextFunction } from "express";

export default class DepartmentValidation{

  static validateGet(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      return res.status(406).json({ status: 406, message: "No se encontró un id." });
    }

    next();
  }

  static validatePost(req: Request, res: Response, next: NextFunction) {
    // Si no es valido retorna
    if(!validateDescription(req,res)) return;
    if(!validateDistrict(req,res)) return;

    next();
  }

  static validatePut(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      return res.status(406).json({ status: 406, message: "No se encontró un id." });
    }

    // Si no es valido retorna
    if(!validateDescription(req,res)) return;
    if(!validateDistrict(req,res)) return;

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

const validateDistrict = (req: Request, res: Response) => {
    if (!req.body.district) {
      res.status(406).json({ status: 406, message: "No se encontró un distrito." });
      return false
    }
  
    if (req.body.district < 0 || req.body.district > 32700){
      res.status(406).json({ status: 406, message: "El distrito es invalido." });
      return false
    }
  
    return true;
}