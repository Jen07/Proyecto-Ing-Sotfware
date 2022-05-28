"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 *  Esta clase se encarga del envio de correos de la aplicacion
 */
class Mailer {
    constructor() {
        this.transporter = Mailer.createTransporter();
    }
    /**
     * Este metodo se encarga de enviar el codigo QR para la doble autenticacion.
     *
     * @param to string - A quien sera enviado
     * @param subject string - Titulo del correo
     * @param text string - Texto contenido
     * @param qr string - QR de autenticacion
     */
    sendQRMail(to, subject, text, qr) {
        const content = Mailer.createContent(to, subject, text, Mailer.createQRTemplate(qr));
        this.transporter.sendMail(content, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log("Message sent: " + info.response);
        });
    }
}
exports.default = Mailer;
/**
 * Este metodo se encarga de crear el transportador para el envio de correos.
 *
 * @returns Transporter
 */
Mailer.createTransporter = () => {
    return nodemailer_1.default.createTransport({
        service: "hotmail",
        port: 587,
        secureConnection: false,
        auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_PASS,
        },
    });
};
/**
 * Este metodo se encarga de crear el contenido del mail
 *
 * @param to string - A quien sera enviado
 * @param subject string - Titulo del correo
 * @param text string - Texto contenido
 * @param html string - HTML de contenido
 */
Mailer.createContent = (to, subject, text, html) => {
    return {
        from: '"Consulta Legal" <Node.Testing@hotmail.com>',
        to: to,
        subject: subject,
        text: text,
        html: html,
    };
};
/**
 * Este metodo se encarga de generar el HTML con el codigo QR.
 *
 * @param qr string - Codigo QR a incrustar en el template
 * @returns string - HTML a ser enviado
 */
Mailer.createQRTemplate = (qr) => {
    return `<p style="background:red;">This is the first email sent with Nodemailer in Node.js </p>
              <pre style="line-height: .9em;letter-spacing: -0.1em;"> ${qr} </pre> `;
};
//# sourceMappingURL=nodeMailer.js.map