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
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
class DoubleAuth {
}
exports.default = DoubleAuth;
_a = DoubleAuth;
/**
 * Este metodo crea un secret para la doble autenticacion.
 *
 * @returns secret - Secret generado por la libreria
 */
DoubleAuth.createSecret = () => {
    const secret = speakeasy_1.default.generateSecret({
        name: "Consulta Legal",
    });
    return secret;
};
/**
 * Este metodo se encarga de obtener el codigo qr apartir de un secret.
 *
 * @param secret GeneratedSecret - Secret generado por la libreria
 * @returns string - Codigo QR
 */
DoubleAuth.generateQRCode = (secret) => __awaiter(void 0, void 0, void 0, function* () {
    let qr = null;
    try {
        if (secret.otpauth_url) {
            qr = qrcode_1.default.toString(secret.otpauth_url);
        }
        else {
            throw new Error("Error on secret");
        }
    }
    catch (err) {
        console.log(err);
    }
    return yield qr;
});
/**
 * Este metodo obtiene el codigo ascii que sera guardado en la base de datos.
 *
 * @param secret GeneratedSecret - Secret generado por la libreria
 * @returns string - Codigo ascii del usuario.
 */
DoubleAuth.getASCII = (secret) => __awaiter(void 0, void 0, void 0, function* () {
    return secret.ascii;
});
/**
 * Este metodo verifica la validez del codigo ingresado por el usuario.
 *
 * @param secret: string - Codigo ascii del usuario.
 * @param token : string - Codigo de 6 digitos.
 * @returns boolean - Indica si el codigo enviado corresponde con el secret del usuario.
 */
DoubleAuth.verifySecret = (secret, token) => {
    return speakeasy_1.default.totp.verify({
        secret: secret,
        encoding: "ascii",
        token: token,
    });
};
//# sourceMappingURL=doubleAuth.js.map