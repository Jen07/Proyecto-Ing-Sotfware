"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClassifierValidation {
    static validateGet(req, res, next) {
        if (!req.params.id && !req.body.id) {
            return res.status(406).json({ status: 406, message: "No se encontrĂ³ un id." });
        }
        next();
    }
    static validatePost(req, res, next) {
        if (!validateIssue(req, res))
            return;
        if (!validateClassifier(req, res))
            return;
        if (!validateKeyword(req, res))
            return;
        next();
    }
    static validateEdit(req, res, next) {
        //no valido nada
        next();
    }
}
exports.default = ClassifierValidation;
const validateIssue = (req, res) => {
    const { issue } = req.body;
    if (!issue) {
        res.status(406).json({ status: 406, message: "No se encontrĂ³ el asunto." });
        return false;
    }
    if (issue === "") {
        res.status(406).json({ status: 406, message: "La asunto es invalido." });
        return false;
    }
    return true;
};
const validateClassifier = (req, res) => {
    const { classifier } = req.body;
    if (!classifier) {
        res.status(406).json({ status: 406, message: "No se encontrĂ³ el clasificador." });
        return false;
    }
    if (classifier < 1 || classifier > 255) {
        res.status(406).json({ status: 406, message: "El clasificador es invalido." });
        return false;
    }
    return true;
};
const validateKeyword = (req, res) => {
    const { keyword } = req.body;
    if (!keyword) {
        res.status(406).json({ status: 406, message: "No se encontrĂ³ palabra clave." });
        return false;
    }
    if (keyword === "") {
        res.status(406).json({ status: 406, message: "La palabra clave es invalida." });
        return false;
    }
    return true;
};
//# sourceMappingURL=validation.js.map