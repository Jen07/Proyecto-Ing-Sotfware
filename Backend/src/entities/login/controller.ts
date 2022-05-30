import { Request, Response } from "express";
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

}