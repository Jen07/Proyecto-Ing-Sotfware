import { Request, Response, NextFunction } from "express";

class LoginValidation {
  static validatePost(req: Request, res: Response, next: NextFunction) {
    // Si no es valido retorna
    if (!validateMail(req, res)) return;
    if (!validatePassword(req, res)) return;

    next();
  }
}

class CodeValidation {
  static codePost(req: Request, res: Response, next: NextFunction) {
    // Si no es valido retorna
    if (!validateCode(req, res)) return;
    next();
  }
}

export default {
  LoginValidation,
  CodeValidation,
};

const validateMail = (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(406).json({ status: 406, message: "No se encontró el mail" });
    return false;
  }

  if (email === "") {
    res.status(406).json({ status: 406, message: "El mail es nulo" });
    return false;
  }

  return true;
};

const validatePassword = (req: Request, res: Response) => {
  const { password } = req.body;

  if (!password) {
    res
      .status(406)
      .json({ status: 406, message: "No se encontró la contraseña." });
    return false;
  }

  if (password === "") {
    res.status(406).json({ status: 406, message: "La contraseña es nula." });
    return false;
  }

  return true;
};

const validateCode = (req: Request, res: Response) => {
  const { secret } = req.body;

  if (!secret) {
    res.status(406).json({ status: 406, message: "No se encontró el codigo." });
    return false;
  }

  if (secret === "") {
    res.status(406).json({ status: 406, message: "La codigo es invalido." });
    return false;
  }

  return true;
};
