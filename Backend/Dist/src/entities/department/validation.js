"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DepartmentValidation {
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
        if (!validateDistrict(req, res))
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
        if (!validateDistrict(req, res))
            return;
        next();
    }
}
exports.default = DepartmentValidation;
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
const validateDistrict = (req, res) => {
    const { district } = req.body;
    console.log(req.body);
    if (!district) {
        res.status(406).json({ status: 406, message: "No se encontró un distrito." });
        return false;
    }
    if (district < 0 || district > 32700) {
        res.status(406).json({ status: 406, message: "El distrito es invalido." });
        return false;
    }
    return true;
};
//# sourceMappingURL=validation.js.map