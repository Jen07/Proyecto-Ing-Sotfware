import { SmallInt, VarChar } from "mssql";
import AbstractService from "../../utils/abstractService";

export default class ClassifierService extends AbstractService {
  constructor() {
    super();
  }

  async getAll(): Promise<ServiceResult<ClassifierModel>> {
    const procedure: string = "sp_List_Classifiers";

    const outputData = await this.db.obtainData(procedure);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200, list: outputData.recordset };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }

  async getOne(id: number): Promise<ServiceResult<ClassifierModel>> {
    const procedure: string = "sp_Get_Classifier";

    const inputData: Array<DataField> = [
      { name: "id", type: SmallInt, data: id },
    ];

    const outputData = await this.db.obtainData(procedure, inputData);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200, item: outputData.recordset[0] };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }

  async post(description: string): Promise<ServiceResult<ClassifierModel>> {
    const procedure: string = "sp_Create_Classifier";

    const inputData: Array<DataField> = [
      { name: "description", type: VarChar(50), data: description },
    ];

    const outputData = await this.db.obtainData(procedure, inputData);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200 };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }

  async put(
    id: number,
    description: string
  ): Promise<ServiceResult<ClassifierModel>> {
    const procedure: string = "sp_Update_Classifier";

    const inputData: Array<DataField> = [
      { name: "id", type: SmallInt, data: id },
      { name: "description", type: VarChar(50), data: description },
    ];

    const outputData = await this.db.obtainData(procedure, inputData);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200 };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }

  async delete(id: number): Promise<ServiceResult<ClassifierModel>> {
    const procedure: string = "sp_Delete_Classifier";

    const inputData: Array<DataField> = [
      { name: "id", type: SmallInt, data: id },
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