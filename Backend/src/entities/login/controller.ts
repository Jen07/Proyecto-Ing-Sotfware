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

    static async validateToken(req: Request, res: Response) {
        // Si paso por los 2 middleware el token es valido.
        res.status(200).json({status:200});
    }

    static async getToken(req: Request, res: Response) {
        const data: ServiceResult<UserModel> = await service.userGet(req.body.id);
        
        if(data.status !== 200){
            return res.status(data.status).json(data);
        }
      
        const token = await TokenAuth.getToken(data);
        res.status(data.status).json(token);
    }


}