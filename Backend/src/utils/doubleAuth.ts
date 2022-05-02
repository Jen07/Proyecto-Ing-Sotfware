import speakeasy from "speakeasy";
import qrcode from "qrcode";

export default class DoubleAuth {
  /**
   * Este metodo crea un secret para la doble autenticacion.
   *
   * @returns secret - Secret generado por la libreria
   */
  static createSecret = () => {
    const secret: speakeasy.GeneratedSecret = speakeasy.generateSecret({
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
  static generateQRCode = async (secret: speakeasy.GeneratedSecret) => {
    let qr = null;

    try {
      if (secret.otpauth_url) {
        qr = qrcode.toString(secret.otpauth_url);
      } else {
        throw new Error("Error on secret");
      }
    } catch (err) {
      console.log(err);
    }

    return await qr;
  };

  /**
   * Este metodo obtiene el codigo ascii que sera guardado en la base de datos.
   *
   * @param secret GeneratedSecret - Secret generado por la libreria
   * @returns string - Codigo ascii del usuario.
   */
  static getASCII = async (secret: speakeasy.GeneratedSecret) => {
    return secret.ascii;
  };

  /**
   * Este metodo verifica la validez del codigo ingresado por el usuario.
   *
   * @param secret: string - Codigo ascii del usuario.
   * @param token : string - Codigo de 6 digitos.
   * @returns boolean - Indica si el codigo enviado corresponde con el secret del usuario.
   */
  static verifySecret = (secret: string, token: string) => {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: "ascii",
      token: token,
    });
  };
}
