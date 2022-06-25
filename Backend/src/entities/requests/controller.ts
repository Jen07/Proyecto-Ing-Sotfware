import { Request, Response } from "express";
import RequestService from "./service";

const service: RequestService = new RequestService();

export default class ClassifierController {

  static async getUserRequests(req: Request, res: Response) {
    const data: ServiceResult<RequestModel> = await service.getUser(req.body.id);
    res.status(data.status).json(data);
  }

  static async getAllRequests(req: Request, res: Response) {
    const data: ServiceResult<RequestModel> = await service.getAll(req.body.id);
    res.status(data.status).json(data);
  }

  static async deleteRequest(req:Request, res: Response){
    const data: ServiceResult<RequestModel> = await service.delete(parseInt(req.params.id));
    res.status(data.status).json(data);
  }

  static async putRequest(req: Request, res: Response) {
    const data: ServiceResult<RequestModel>
     = await service.put(parseInt(req.body.id_response_user), req.body.response_detail,
      parseInt(req.body.id_legal_response),parseInt(req.body.id) );
    res.status(data.status).json(data);
  }

  static async postNewRequests(req: Request, res: Response){
    
    const data: ServiceResult<RequestModel> = await service.postRequest(
      req.body.user_id,
      req.body.issue,
      req.body.classifier,
      req.body.keyword,
      req.body.attachments.length
    ); 

    if(req.body.attachments.length > 0){  
      req.body.attachments.forEach( async(file:any, index:number) => {
        await service.postAttachment(
          data.item?.id || 0,
          index,
          file.data,
          file.name
        ); 
      });
    }

    res.json("")
  }

}