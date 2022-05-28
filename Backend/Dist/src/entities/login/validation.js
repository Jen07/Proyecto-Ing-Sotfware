"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClassifierValidation {
    static validatePost(req, res, next) {
        // Si no es valido retorna
        if (!validateMail(req, res))
            return;
        if (!validatePassword(req, res))
            return;
        next();
    }
}
exports.default = ClassifierValidation;
const validateMail = (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(406).json({ status: 406, message: "No se encontró una datos." });
        return false;
    }
    if (email === "") {
        res.status(406).json({ status: 406, message: "La datos es invalida." });
        return false;
    }
    return true;
};
const validatePassword = (req, res) => {
    const { password } = req.body;
    if (!password) {
        res.status(406).json({ status: 406, message: "No se encontró una datos." });
        return false;
    }
    if (password === "") {
        res.status(406).json({ status: 406, message: "La datos es invalida." });
        return false;
    }
    return true;
};
//# sourceMappingURL=validation.js.map