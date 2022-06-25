import { Int, MAX, SmallInt, TinyInt, VarChar } from "mssql";
import AbstractService from "../../utils/abstractService";

export default class AttachmentService extends AbstractService {
  constructor() {
    super();
  }

  async getAll(id_request: number): Promise<ServiceResult<AttachmentModel>> {
    const procedure: string = "sp_List_Attachments";

    const inputData: Array<DataField> = [
      { name: "id_request", type: Int , data: `${id_request}` },
    ];

    const outputData = await this.db.obtainData(procedure, inputData);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200, list: outputData.recordset };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }

    return this.result;
  }


}