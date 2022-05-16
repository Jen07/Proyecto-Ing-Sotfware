import { Request, Response } from "express";
import TestService from "./service";

const service: TestService = new TestService();

export default class TestController{

    static async getData(eq: Request, res: Response){
       
        const data: ServiceResult<TestModel> = await service.getData(1, "Prueba Base");
        res.status(data.status).json(data);

    }
}