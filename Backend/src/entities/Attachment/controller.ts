import { Request, Response } from "express";
import RequestService from "./service";

const service: RequestService = new RequestService();

export default class AttachmentController {

  //Listar Archivos
  static async listAttachmentsRequest(req: Request, res: Response) {
    console.log(req.body.id_request);
    const data: ServiceResult<AttachmentModel> = await service.getAll(req.body.id_request);
    res.status(data.status).json(data);
  }

}