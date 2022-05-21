import { Request, Response, NextFunction } from "express";

export default class LocalValidation {

  static validateGet(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      return res.status(406).json({ status: 406, message: "No se encontró un id." });
    }

    next();
  }

}