import { MAX, SmallInt, VarChar, Int } from "mssql";
import AbstractService from "../../utils/abstractService";
import DoubleAuth from "../../utils/doubleAuth";

export default class LoginService extends AbstractService {
  constructor() {
    super();
  }

  async post(
    email: string,
    password: string
  ): Promise<ServiceResult<LoginModel>> {
    const procedure: string = "sp_Login";

    const inputData: Array<DataField> = [
      { name: "email", type: VarChar(50), data: email },
      { name: "password", type: VarChar(12), data: password },
    ];

    const outputData = await this.db.obtainData(procedure, inputData);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200 }; //enviar datos del user outputData?.recordset
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }

    return this.result;
  }

  async codePost(code: string): Promise<ServiceResult<CodeModel>> {
    const procedure: string = "sp_VerifyCode";

    const inputData: Array<DataField> = [
      { name: "id", type: Int, data: 979020 }, //quedamo cedula ver despues
    ];

    const outputData = await this.db.obtainData(procedure, inputData);

    var secret = outputData?.recordset[0].secret; //validar haya un secret
    const verify = DoubleAuth.verifySecret(secret, code);

    if (verify) {
      this.result = { status: 200 };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    return this.result;
  }

  async userGet(id: string): Promise<ServiceResult<UserModel>> {
    const procedure: string = "sp_GetAuthenticatedUser";

    const inputData: Array<DataField> = [
      { name: "id", type: Int, data: id }, // cedula ver despues
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