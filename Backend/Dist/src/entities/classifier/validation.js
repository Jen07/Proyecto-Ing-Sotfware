"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClassifierValidation {
    static validateGet(req, res, next) {
        if (!req.params.id) {
            return res.status(406).json({ status: 406, message: "No se encontró un id." });
        }
        next();
    }
    static validatePost(req, res, next) {
        // Si no es valido retorna
        if (!validateDescription(req, res))
            return;
        next();
    }
    static validatePut(req, res, next) {
        if (!req.params.id) {
            return res.status(406).json({ status: 406, message: "No se encontró un id." });
        }
        // Si no es valido retorna
        if (!validateDescription(req, res))
            return;
        next();
    }
}
exports.default = ClassifierValidation;
const validateDescription = (req, res) => {
    const { description } = req.body;
    if (!description) {
        res.status(406).json({ status: 406, message: "No se encontró una descripcion." });
        return false;
    }
    if (description === "") {
        res.status(406).json({ status: 406, message: "La descripcion es invalida." });
        return false;
    }
    return true;
};
//# sourceMappingURL=validation.js.map