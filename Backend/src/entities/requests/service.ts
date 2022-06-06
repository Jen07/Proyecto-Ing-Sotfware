import { Int, MAX, SmallInt, VarChar } from "mssql";
import AbstractService from "../../utils/abstractService";

export default class RequestService extends AbstractService {
  constructor() {
    super();
  }

  async getAll(id: number): Promise<ServiceResult<RequestModel>> {
    const procedure: string = "sp_List_User_Requests";

    const inputData: Array<DataField> = [
      { name: "id", type: VarChar(9), data: `${id}` },
    ];

    const outputData = await this.db.obtainData(procedure, inputData);

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