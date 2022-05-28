"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocalValidation {
    static validateGet(req, res, next) {
        if (!req.params.id) {
            return res.status(406).json({ status: 406, message: "No se encontró un id." });
        }
        next();
    }
}
exports.default = LocalValidation;
//# sourceMappingURL=validation.js.map