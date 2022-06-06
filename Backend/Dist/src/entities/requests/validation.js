"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClassifierValidation {
    static validateGet(req, res, next) {
        if (!req.params.id && !req.body.id) {
            return res.status(406).json({ status: 406, message: "No se encontró un id." });
        }
        next();
    }
}
exports.default = ClassifierValidation;
//# sourceMappingURL=validation.js.map