import { SmallDateTime, SmallInt, VarChar, Int, TinyInt, MAX } from "mssql";
import AbstractService from "../../utils/abstractService";

export default class UserService extends AbstractService {

  constructor() {
    super();
  }

  async getAll(): Promise<ServiceResult<UserModel>> {
    const procedure: string = "sp_List_User";

    const outputData = await this.db.obtainData(procedure);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200, list: outputData.recordset };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }


  async getOne(id: number): Promise<ServiceResult<UserModel>> {
    const procedure: string = "sp_Get_User";

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

  async delete(id: number): Promise<ServiceResult<UserModel>> {
    const procedure: string = "sp_Delete_User";

    const inputData: Array<DataField> = [
      { name: "id", type: Int, data: id },
    ];

    const outputData = await this.db.obtainData(procedure, inputData);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200 };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }

  /********************************************************** */
  async post(id: number,
    identification: string,
    name: string,
    surName: string,
    lastName: string,
    picture: string,
    birthdate: Date,
    email: string,
    phone: string,
    password: string,
    id_sex: number,
    id_department: number,
    id_district: number): Promise<ServiceResult<UserModel>> {
    const procedure: string = "sp_Create_User";

    const inputData: Array<DataField> = [
      { name: "id", type: Int, data: id },
      { name: "identification", type: VarChar(9), data: identification },
      { name: "name", type: VarChar(30), data: name },
      { name: "surName", type: VarChar(26), data: surName },
      { name: "lastName", type: VarChar(26), data: lastName },
      { name: "picture", type: VarChar(MAX), data: picture },
      { name: "birthdate", type: SmallDateTime, data: birthdate },
      { name: "email", type: VarChar(50), data: email },
      { name: "phone", type: VarChar(12), data: phone },
      { name: "password", type: VarChar(50), data: password },
      { name: "id_sex", type: TinyInt, data: id_sex },
      { name: "id_department", type: SmallInt, data: id_department },
      { name: "id_district", type: SmallInt, data: id_district }
    ];

    const outputData = await this.db.obtainData(procedure, inputData);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200 };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }

  async put(id: number,
    identification: string,
    name: string,
    surName: string,
    lastName: string,
    picture: string,
    birthdate: Date,
    email: string,
    phone: string,
    password: string,
    id_sex: number,
    id_department: number,
    id_district: number): Promise<ServiceResult<UserModel>> {
    const procedure: string = "sp_Update_User";

    const inputData: Array<DataField> = [
      { name: "id", type: Int, data: id },
      { name: "identification", type: VarChar(9), data: identification },
      { name: "name", type: VarChar(30), data: name },
      { name: "surName", type: VarChar(26), data: surName },
      { name: "lastName", type: VarChar(26), data: lastName },
      { name: "picture", type: VarChar(MAX), data: picture },
      { name: "birthdate", type: SmallDateTime, data: birthdate },
      { name: "email", type: VarChar(50), data: email },
      { name: "phone", type: VarChar(12), data: phone },
      { name: "password", type: VarChar(50), data: password },
      { name: "id_sex", type: TinyInt, data: id_sex },
      { name: "id_department", type: SmallInt, data: id_department },
      { name: "id_district", type: SmallInt, data: id_district }
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
