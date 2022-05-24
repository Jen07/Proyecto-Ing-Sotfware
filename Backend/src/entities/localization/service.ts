import { SmallInt } from "mssql";
import AbstractService from "../../utils/abstractService";

export default class LocalService extends AbstractService {
  constructor() {
    super();
  }

  async getCountries(): Promise<ServiceResult<any>> {
    const procedure: string = "sp_List_Countries";

    const outputData = await this.db.obtainData(procedure);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200, list: outputData.recordset };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }

  async getProvinces(): Promise<ServiceResult<any>> {
    const procedure: string = "sp_List_Provinces";

    const outputData = await this.db.obtainData(procedure);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200, list: outputData.recordset };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }

  async getCantons(): Promise<ServiceResult<any>> {
    const procedure: string = "sp_List_Cantons";

    const outputData = await this.db.obtainData(procedure);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200, list: outputData.recordset };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }

  async getDistricts(): Promise<ServiceResult<any>> {
    const procedure: string = "sp_List_Districts";

    const outputData = await this.db.obtainData(procedure);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200, list: outputData.recordset };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }

  async getOneDistrict(id: number): Promise<ServiceResult<any>> {
    const procedure: string = "sp_Get_District";

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
}