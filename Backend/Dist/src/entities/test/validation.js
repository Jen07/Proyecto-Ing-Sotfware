"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestValidation {
    static validate(req, res, next) {
        // Si los datos son invalidos retornar una respuesta y no ejecutar el next.
        next();
    }
}
exports.default = TestValidation;
//# sourceMappingURL=validation.js.map