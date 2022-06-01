"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenAuth {
}
exports.default = TokenAuth;
_a = TokenAuth;
/**
 * Este método genera un token para el usuario.
 *
 * @param data Datos a agregar en el token
 * @param res  Respuesta al usuario
 */
TokenAuth.getToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = { status: 200 };
    return new Promise((res, rej) => {
        // Recibimos la data y creamos un token con la misma.
        jsonwebtoken_1.default.sign({ data }, `${process.env.TOKEN_KEY}`, { expiresIn: '10h' }, (err, token) => {
            if (err) {
                result.status = 404;
                return res(result);
            }
            else {
                result.item = token;
                return res(result);
            }
        });
    });
});
/**
 * Este metodo se encarga de obtener un
 * token del header y asignarlo a la request
 *
 * @param req Solicitud del usuario
 * @param res Respuesta al usuario
 * @param next Paso a siguiente middleware
 */
TokenAuth.recoverToken = (req, res, next) => {
    // Obtener del lado del cliente los datos de authorization
    const bearerHeader = req.headers['authorization'];
    console.log(req.headers);
    if (!bearerHeader) {
        return res.status(403).json({ status: 403 });
    }
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    // Al obtener el token correcto se ejecuta la función next
    next();
};
/**
 * Este metodo se encarga de verificar que el token asignado sea valido.
 *
 * @param req Solicitud del usuario
 * @param res Respuesta al usuario
 * @param next Paso a siguiente middleware
*/
TokenAuth.verifyToken = (req, res, next) => {
    // La información de authData debe ser la enviada al getToken
    jsonwebtoken_1.default.verify(req.token, `${process.env.TOKEN_KEY}`, (err, data) => {
        if (err) {
            return res.status(403).json({ status: 403 });
        }
        // Si el token es valido entonces se indica que el acceso es permitido
        req.token = data.dataBD;
        next();
    });
};
//# sourceMappingURL=tokenAuth.js.map