import { Request, Response, NextFunction } from "express";

export default class ClassifierValidation {


    static validatePost(req: Request, res: Response, next: NextFunction) {
        // Si no es valido retorna
        if(!validateMail(req,res)) return;
        if(!validatePassword(req,res)) return;
    
        next();
      }


}

const validateMail = (req: Request, res: Response) => {

    const {email} = req.body
  
    if (!email) {
      res.status(406).json({ status: 406, message: "No se encontró una datos." });
      return false
    }
  
    if (email === ""){
      res.status(406).json({ status: 406, message: "La datos es invalida." });
      return false
    }
  
    return true;
  }

  const validatePassword = (req: Request, res: Response) => {

    const {password} = req.body
  
    if (!password) {
      res.status(406).json({ status: 406, message: "No se encontró una datos." });
      return false
    }
  
    if (password === ""){
      res.status(406).json({ status: 406, message: "La datos es invalida." });
      return false
    }
  
    return true;
  }