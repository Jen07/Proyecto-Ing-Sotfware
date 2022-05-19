import { Request, Response } from "express";
import ClassifierService from "./service";

const service: ClassifierService = new ClassifierService();

export default class ClassifierController {

  static async getAll(req: Request, res: Response) {
    const data: ServiceResult<TestModel> = await service.getAll();
    res.status(data.status).json(data);
  }

  static async getOne(req: Request, res: Response) {
    const data: ServiceResult<TestModel> = await service.getOne(parseInt(req.params.id));
    res.status(data.status).json(data);
  }

  static async post(req: Request, res: Response) {
    const data: ServiceResult<TestModel> = await service.post(req.body.description);
    res.status(data.status).json(data);
  }

  static async put(req: Request, res: Response) {
    const data: ServiceResult<TestModel> = await service.put(parseInt(req.params.id), req.body.description);
    res.status(data.status).json(data);
  }

  static async delete(req: Request, res: Response) {
    const data: ServiceResult<TestModel> = await service.delete(parseInt(req.params.id));
    res.status(data.status).json(data);
  }

}