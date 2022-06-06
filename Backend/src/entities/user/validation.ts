import { Request, Response, NextFunction } from "express";

export default class UserValidation{

  static validateGet(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      return res.status(406).json({ status: 406, message: "No se encontró un id." });
    }

    next();
  }

  static validatePost(req: Request, res: Response, next: NextFunction) {
  
    // Si no es valido retorna
    if(!validateId(req,res)) return;
    if(!validateDistrict(req,res)) return;
    if(!validateIdentification(req,res)) return;
    
    next();
  }

  static validatePut(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      return res.status(406).json({ status: 406, message: "No se encontró un id." });
    }

    // Si no es valido retorna
    if(!validateId(req,res)) return;
    if(!validateDistrict(req,res)) return;

    next();
  } 

}

const validateId = (req: Request, res: Response) => {

  const {id} = req.body;

  if (!id) {
    res.status(406).json({ status: 406, message: "No se encontró un id." });
    return false
  }

  if (id === ""){
    res.status(406).json({ status: 406, message: "La descripcion es invalida." });
    return false
  }

  return true;
}

const validateIdentification = (req: Request, res: Response) => {

    const {identification} = req.body;
  
    if (!identification) {
      res.status(406).json({ status: 406, message: "No se encontró un identification." });
      return false
    }
  
    if (identification === ""){
      res.status(406).json({ status: 406, message: "La descripcion es invalida." });
      return false
    }
  
    return true;
  }

const validateDistrict = (req: Request, res: Response) => {
  const {id_district} = req.body;
    console.log(req.body);
    
    if (!id_district) {
      res.status(406).json({ status: 406, message: "No se encontró un distrito." });
      return false
    }
  
    if (id_district < 0 || id_district > 32700){
      res.status(406).json({ status: 406, message: "El distrito es invalido." });
      return false
    }
  
    return true;
}