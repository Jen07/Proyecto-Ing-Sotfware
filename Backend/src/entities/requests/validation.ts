import { Request, Response, NextFunction } from "express";

export default class ClassifierValidation {

  static validateGet(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id && !req.body.id) {
      return res.status(406).json({ status: 406, message: "No se encontró un id." });
    }

    next();
  }

  static validatePost(req: Request, res: Response, next: NextFunction) {
    if (!validateIssue(req, res)) return;
    if (!validateClassifier(req, res)) return;
    if (!validateKeyword(req, res)) return;

    next();
  }

}

const validateIssue = (req: Request, res: Response) => {
  const { issue } = req.body;

  if (!issue) {
    res.status(406).json({ status: 406, message: "No se encontró el asunto." });
    return false;
  }

  if (issue === "") {
    res.status(406).json({ status: 406, message: "La asunto es invalido." });
    return false;
  }

  return true;
};

const validateClassifier = (req: Request, res: Response) => {
  const { classifier } = req.body;

  if (!classifier) {
    res.status(406).json({ status: 406, message: "No se encontró el clasificador." });
    return false;
  }

  if (classifier < 1 || classifier > 255) {
    res.status(406).json({ status: 406, message: "El clasificador es invalido." });
    return false;
  }

  return true;
};

const validateKeyword = (req: Request, res: Response) => {
  const { keyword } = req.body;

  if (!keyword) {
    res.status(406).json({ status: 406, message: "No se encontró palabra clave." });
    return false;
  }

  if (keyword ==="") {
    res.status(406).json({ status: 406, message: "La palabra clave es invalida." });
    return false;
  }

  return true;
};



