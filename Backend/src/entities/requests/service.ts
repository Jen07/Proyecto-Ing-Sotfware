import { SmallInt, VarChar } from "mssql";
import AbstractService from "../../utils/abstractService";

export default class RequestService extends AbstractService {
  constructor() {
    super();
  }

  async getAll(id:number): Promise<ServiceResult<ClassifierModel>> {
    const procedure: string = "sp_List_User_Requests";

    const inputData: Array<DataField> = [
      { name: "id", type: VarChar(9), data: `${id}` }
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