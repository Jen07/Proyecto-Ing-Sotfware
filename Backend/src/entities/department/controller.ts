import { Request, Response } from "express";
import DepartmentService from "./service";

const service: DepartmentService = new DepartmentService();

export default class DepartmentController {
    
  static async getAll(req: Request, res: Response) {
    const data: ServiceResult<DepartmentModel> = await service.getAll();
    res.status(data.status).json(data);
  }

  static async getOne(req: Request, res: Response) {
    const data: ServiceResult<TestModel> = await service.getOne(parseInt(req.params.id));
    res.status(data.status).json(data);
  }

  static async post(req: Request, res: Response) {
    const data: ServiceResult<TestModel> = await service.post(req.body.description, req.body.district);
    res.status(data.status).json(data);
  }

  static async put(req: Request, res: Response) {
    const data: ServiceResult<TestModel> = await service.put(parseInt(req.params.id), req.body.description, req.body.district);
    res.status(data.status).json(data);
  }

  static async delete(req: Request, res: Response) {
    const data: ServiceResult<TestModel> = await service.delete(parseInt(req.params.id));
    res.status(data.status).json(data);
  }
}
