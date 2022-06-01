import { Request, Response } from "express";
import TokenAuth from "../../utils/tokenAuth";
import LoginService from "./service";

const service: LoginService = new LoginService();

export default class LoginController {

    static async post(req: Request, res: Response) {
        const data: ServiceResult<LoginModel> = await service.post(req.body.email,req.body.password);
        res.status(data.status).json(data);
    }
    
    static async codePost(req: Request, res: Response) {
        const data: ServiceResult<CodeModel> = await service.codePost(req.body.secret);
        res.status(data.status).json(data);
    }


    /**
     * Este metodo se encarga de validar que un token ingresado sea correcto.
     * @param req Solicitud del usuario
     * @param res Respuesta al usuario
     */
    static async validateToken(req: Request, res: Response) {
        // Si paso por los 2 middleware el token es valido.
        res.status(200).json({status:200});
    }

    /**
     *  Este metodo se encarga de obtener un token con los datos de usuario.
     * @param req Solicitud del usuario
     * @param res Respuesta al usuario
     * @returns Estado con el token o un error
     */
    static async getToken(req: Request, res: Response) {
        const data: ServiceResult<UserModel> = await service.userGet(req.body.id);
        
        if(data.status !== 200){
            return res.status(data.status).json(data);
        }
        
        const token:any = await TokenAuth.getToken(data.item);

        res.status(data.status).json({status: data.status,token:token.item});
    }
    
    /**
     *  Este metodo se encarga de obtener la foto de un usuario autenticado.
     * @param req Solicitud del usuario
     * @param res Respuesta al usuario
     * @returns Estado con la foto o un error
     */
    static async getPicture(req: Request, res: Response) {
        const data: ServiceResult<UserModel> = await service.pictureGet(req.body.id);
        return res.status(data.status).json(data);
    }

}