import { Int, MAX, VarChar } from "mssql";
import AbstractService from "../../utils/abstractService";

export default class TestService extends AbstractService {
  constructor() {
    super();
  }

  async getData(id:number, description:string):Promise<ServiceResult<TestModel>> {
    const procedure: string = "sp_GetTest";
   
    const inputData: Array<DataField> = [
      { name: "id", type: Int, data: id },
      { name: "description", type: VarChar(MAX), data: description },
    ];
   
    const outputData = await this.db.obtainData(procedure, inputData);

    if (outputData && outputData?.returnValue !== -1) {
      this.result = { status: 200, message: "Los datos son válidos.", item: outputData.recordset[0]  };
    } else {
      this.result = { status: 404, message: "Los datos no son válidos."};
    }
    return this.result;
  }

}

/*
    Este es el SP para esta prueba. 

    GO 
      CREATE OR ALTER PROCEDURE sp_GetTest
      @id INT,
      @description VARCHAR(MAX)
      AS 
      BEGIN
          SET NOCOUNT ON
          BEGIN TRANSACTION
              BEGIN TRY
                      SELECT @id as [id], @description as [description]
                      
                      IF @@ROWCOUNT = 0
                      THROW 51000, 'The test is incorrect.', 1;  

                  IF @@TRANCOUNT > 0  
                      BEGIN
                      COMMIT TRANSACTION; 
                      RETURN 1;
                      END
              END TRY

              BEGIN CATCH
                  IF @@TRANCOUNT > 0  
                          BEGIN
                          ROLLBACK TRANSACTION;
                          SELECT ERROR_MESSAGE() AS ErrorMessage;
                          RETURN -1;
                          END
              END CATCH
      END

*/