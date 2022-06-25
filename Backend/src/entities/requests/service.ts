import { Int, MAX, SmallInt, TinyInt, VarChar } from "mssql";
import AbstractService from "../../utils/abstractService";

export default class RequestService extends AbstractService {
  constructor() {
    super();
  }

  async getUser(id: number): Promise<ServiceResult<RequestModel>> {
    const procedure: string = "sp_List_User_Requests";

    const inputData: Array<DataField> = [
      { name: "id", type: VarChar(9) , data: `${id}` },
    ];

    const outputData = await this.db.obtainData(procedure, inputData);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200, list: outputData.recordset };
    } else {
      this.result = { status: 200, list: [] };
    }
    return this.result;
  }

  async delete(id: number): Promise<ServiceResult<RequestModel>> {
    const procedure: string = "sp_Delete_Request";

    const inputData: Array<DataField> = [
      { name: "request_id", type: Int, data: id },
    ];

    const outputData = await this.db.obtainData(procedure, inputData);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200, list: outputData.recordset };
    } else {
      this.result = { status: 200, list: [] };
    }
    return this.result;
  }


  //Editar la solicitud para agregar los datos de la respuesta
  async put( id_response_user: number, response_detail: string, id_legal_response:number,
    id:number): Promise<ServiceResult<RequestModel>> {
    const procedure: string = "sp_Update_Request";

    const inputData: Array<DataField> = [
      { name: "id_response_user", type: Int, data: id_response_user },
      { name: "response_detail", type: VarChar(60), data: response_detail },
      { name: "id_legal_response", type: TinyInt, data:id_legal_response },
      { name: "id", type: Int, data: id }
    ];

    const outputData = await this.db.obtainData(procedure, inputData);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200 };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }


  async getAll(id: number): Promise<ServiceResult<RequestModel>> {
    const procedure: string = "sp_List_All_Requests";
    const outputData = await this.db.obtainData(procedure);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200, list: outputData.recordset };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }
  

  async postRequest(
    user_id: number,
    issue: string,
    classifier: number,
    keyword: string,
    attachments: number
  ): Promise<ServiceResult<RequestModel>> {
    const procedure: string = "sp_Create_Request";

    const inputData: Array<DataField> = [
      { name: "user_id", type: Int, data: `${user_id}` },
      { name: "issue", type: VarChar(60), data: `${issue}` },
      { name: "classifier", type: SmallInt, data: `${classifier}` },
      { name: "keyword", type: VarChar(30), data: `${keyword}` },
      { name: "attachments", type: SmallInt, data: `${attachments}` },
    ];

    const outputData = await this.db.obtainData(procedure, inputData);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200, item: outputData.recordset[0] };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }

  async postAttachment(
    request_id: number,
    line: number,
    file: string,
    comment: string,
  ): Promise<ServiceResult<RequestModel>> {
    const procedure: string = "sp_Create_Attachment";

    const inputData: Array<DataField> = [
      { name: "request_id", type: Int, data: `${request_id}` },
      { name: "line", type: SmallInt, data: `${line}` },
      { name: "file", type: VarChar(MAX), data: `${file}` },
      { name: "comment", type: VarChar(50), data: `${comment}` }
    ];

    const outputData = await this.db.obtainData(procedure, inputData);

    
    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200 };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
    
  }

}