import { Request, Response } from "express";
import RequestService from "./service";


const service: RequestService = new RequestService();

export default class ClassifierController {

  static async getUserRequests(req: Request, res: Response) {
    const data: ServiceResult<RequestModel> = await service.getAll(req.body.id);
    res.status(data.status).json(data);
  }

 
}