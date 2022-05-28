import { MAX, SmallInt, VarChar } from "mssql";
import AbstractService from "../../utils/abstractService";

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
      this.result = { status: 200 };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos." };
    }
    console.log(this.result);
    
    return this.result;
  }

}