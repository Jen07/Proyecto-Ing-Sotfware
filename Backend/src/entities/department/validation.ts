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

  const {description} = req.body;

  if (!description) {
    res.status(406).json({ status: 406, message: "No se encontró una descripcion." });
    return false
  }

  if (description === ""){
    res.status(406).json({ status: 406, message: "La descripcion es invalida." });
    return false
  }

  return true;
}

const validateDistrict = (req: Request, res: Response) => {
  const {district} = req.body;

    if (district) {
      res.status(406).json({ status: 406, message: "No se encontró un distrito." });
      return false
    }
  
    if (district < 0 || district > 32700){
      res.status(406).json({ status: 406, message: "El distrito es invalido." });
      return false
    }
  
    return true;
}