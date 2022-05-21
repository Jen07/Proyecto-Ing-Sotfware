import { Request, Response } from "express";
import LocalService from "./service";

const service: LocalService = new LocalService();

export default class LocalController {
  static async getCountries(req: Request, res: Response) {
    const data: ServiceResult<TestModel> = await service.getCountries();
    res.status(data.status).json(data);
  }

  static async getProvinces(req: Request, res: Response) {
    const data: ServiceResult<TestModel> = await service.getProvinces();
    res.status(data.status).json(data);
  }

  static async getCantons(req: Request, res: Response) {
    const data: ServiceResult<TestModel> = await service.getCantons();
    res.status(data.status).json(data);
  }

  static async getDistricts(req: Request, res: Response) {
    const data: ServiceResult<TestModel> = await service.getDistricts();
    res.status(data.status).json(data);
  }

  static async getOneDistrict(req: Request, res: Response) {
    const data: ServiceResult<TestModel> = await service.getOneDistrict(parseInt(req.params.id));
    res.status(data.status).json(data);
  }
}
