import { Request, Response, NextFunction } from "express";

export default class ClassifierValidation {

  static validateGet(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id && !req.body.id) {
      return res.status(406).json({ status: 406, message: "No se encontró un id." });
    }

    next();
  }
}