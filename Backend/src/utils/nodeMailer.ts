import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

/**
 *  Esta clase se encarga del envio de correos de la aplicacion
 */
export default class Mailer {
  /**
   * Esta variable contiene los datos de autenticacion para el envio del correo
   */
  transporter: any;
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
  sendQRMail(to: string, subject: string, text: string, qr: string) {
    const content = Mailer.createContent(
      to,
      subject,
      text,
      Mailer.createQRTemplate(qr)
    );

    this.transporter.sendMail(content, (error: any, info: any) => {
      if (error) {
        return console.log(error);
      }

      console.log("Message sent: " + info.response);
    });
  }

  /**
   * Este metodo se encarga de crear el transportador para el envio de correos.
   * 
   * @returns Transporter
   */
  private static createTransporter = () => {
    return nodemailer.createTransport({
      service: "hotmail",
      port: 587,
      secureConnection: false,
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASS,
      },
    } as SMTPTransport.Options);
  };

  /**
   * Este metodo se encarga de crear el contenido del mail
   * 
   * @param to string - A quien sera enviado
   * @param subject string - Titulo del correo
   * @param text string - Texto contenido
   * @param html string - HTML de contenido
   */
  private static createContent = (
    to: string,
    subject: string,
    text: string,
    html: string
  ) => {
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
  private static createQRTemplate = (qr: string) => {
    return `<p style="background:red;">This is the first email sent with Nodemailer in Node.js </p>
              <pre style="line-height: .9em;letter-spacing: -0.1em;"> ${qr} </pre> `;
  };
}