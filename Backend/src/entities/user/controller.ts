import { Request, Response } from "express";
import UserService from "./service";

const service: UserService = new UserService();

export default class DepartmentController {

    static async getAll(req: Request, res: Response) {
        const data: ServiceResult<UserModel> = await service.getAll();
        res.status(data.status).json(data);
    }

    static async getOne(req: Request, res: Response) {
        const data: ServiceResult<UserModel> = await service.getOne(parseInt(req.params.id));
        res.status(data.status).json(data);
    }

    static async post(req: Request, res: Response) {
        const data: ServiceResult<UserModel> = await service.post(parseInt(req.params.id), req.params.identification,
            req.body.name, req.body.surName, req.body.lastName, req.body.picture, req.body.birthdate, req.body.email,
            req.body.phone, req.body.password, req.body.id_sex, req.body.id_department, req.body.id_district);
        res.status(data.status).json(data);
    }

    static async put(req: Request, res: Response) {
        const data: ServiceResult<UserModel> = await service.put(parseInt(req.params.id), req.params.identification,
            req.body.name, req.body.surName, req.body.lastName, req.body.picture, req.body.birthdate, req.body.email,
            req.body.phone, req.body.password, req.body.id_sex, req.body.id_department, req.body.id_district);
        res.status(data.status).json(data);
    }

    static async delete(req: Request, res: Response) {
        const data: ServiceResult<UserModel> = await service.delete(parseInt(req.params.id));
        res.status(data.status).json(data);
    }
}
