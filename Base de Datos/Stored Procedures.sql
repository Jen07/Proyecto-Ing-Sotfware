/*-----------------------------------------------------------------------------------------
									Procedimientos Department
-----------------------------------------------------------------------------------------*/

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado para listar todos los departamentos>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_List_Departments
	AS 
	BEGIN
		SET NOCOUNT ON
        BEGIN TRANSACTION
			BEGIN TRY

				SELECT dep.[id], dep.[description] AS [departament], dis.[description] AS [district] 
				FROM tb_departments dep, tb_districts dis
				WHERE dep.id_district = dis.id  
				ORDER BY dep.[description]

				-- Si por alguna razon no se pudo ejecutar el query se lanza el error.
				IF @@ROWCOUNT = 0
					THROW 51000, 'An SQL error has occurred.', 1;  
				
				-- Si hay una transaccion abierta y se ejecuto el query completa la transaccion.
                IF @@TRANCOUNT > 0  
                      BEGIN
                      COMMIT TRANSACTION; 
                      RETURN 1;
                END
			END TRY

			BEGIN CATCH
				-- Si habia abierta una transaccion se cierra haciendo rollback.
				IF @@TRANCOUNT > 0  
					BEGIN
						ROLLBACK TRANSACTION;
                        SELECT ERROR_MESSAGE() AS ErrorMessage;
                        RETURN -1;
                  END
			END CATCH
	END

---------------------------------------------------------------------------------------------

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado para listar un departamento especifico.>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_Get_Department
	@id SMALLINT
	AS 
    BEGIN
		SET NOCOUNT ON
			BEGIN TRANSACTION
				BEGIN TRY
					SELECT dep.[id], dep.[description] AS [departament], dis.[description] AS [district] 
					FROM tb_departments dep, tb_districts dis
					WHERE dep.id_district = dis.id 
					AND @id = dep.id
                      
				-- Si hay una transaccion abierta y se ejecuto el query completa la transaccion.
                IF @@TRANCOUNT > 0  
                      BEGIN
                      COMMIT TRANSACTION; 
                      RETURN 1;
                END
			END TRY

			BEGIN CATCH
				-- Si habia abierta una transaccion se cierra haciendo rollback.
				IF @@TRANCOUNT > 0  
					BEGIN
						ROLLBACK TRANSACTION;
                        SELECT ERROR_MESSAGE() AS ErrorMessage;
                        RETURN -1;
                  END
			END CATCH
	END


---------------------------------------------------------------------------------------------

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado para crear un departamento.>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_Create_Department
	@description VARCHAR(50),
	@district SMALLINT
	AS 
    BEGIN
		SET NOCOUNT ON
			BEGIN TRANSACTION
				BEGIN TRY
					INSERT INTO tb_departments([description],[id_district]) VALUES (@description,@district)
  
				-- Si por alguna razon no se pudo ejecutar el query se lanza el error.
				IF @@ROWCOUNT = 0
					THROW 51000, 'An SQL error has occurred.', 1;  

				-- Si hay una transaccion abierta y se ejecuto el query completa la transaccion.
                IF @@TRANCOUNT > 0  
                      BEGIN
                      COMMIT TRANSACTION; 
                      RETURN 1;
                END
			END TRY

			BEGIN CATCH
				-- Si habia abierta una transaccion se cierra haciendo rollback.
				IF @@TRANCOUNT > 0  
					BEGIN
						ROLLBACK TRANSACTION;
                        SELECT ERROR_MESSAGE() AS ErrorMessage;
                        RETURN -1;
                  END
			END CATCH
	END


---------------------------------------------------------------------------------------------

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado para actualizar un departamento.>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_Update_Department
	@id SMALLINT,
	@description VARCHAR(50),
	@district SMALLINT
	AS 
    BEGIN
		SET NOCOUNT ON
			BEGIN TRANSACTION
				BEGIN TRY
					UPDATE tb_departments
					SET [description] = @description,[id_district] = @district
					WHERE @id = id


				-- Si por alguna razon no se pudo ejecutar el query se lanza el error.
				IF @@ROWCOUNT = 0
					THROW 51000, 'An SQL error has occurred.', 1;  

				-- Si hay una transaccion abierta y se ejecuto el query completa la transaccion.
                IF @@TRANCOUNT > 0  
                      BEGIN
                      COMMIT TRANSACTION; 
                      RETURN 1;
                END
			END TRY

			BEGIN CATCH
				-- Si habia abierta una transaccion se cierra haciendo rollback.
				IF @@TRANCOUNT > 0  
					BEGIN
						ROLLBACK TRANSACTION;
                        SELECT ERROR_MESSAGE() AS ErrorMessage;
                        RETURN -1;
                  END
			END CATCH
	END

---------------------------------------------------------------------------------------------

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado para eliminar un departamento.>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_Delete_Department
	@id SMALLINT
	AS 
    BEGIN
		SET NOCOUNT ON
			BEGIN TRANSACTION
				BEGIN TRY
					DELETE FROM tb_departments
					WHERE @id = id


				-- Si por alguna razon no se pudo ejecutar el query se lanza el error.
				IF @@ROWCOUNT = 0
					THROW 51000, 'An SQL error has occurred.', 1;  

				-- Si hay una transaccion abierta y se ejecuto el query completa la transaccion.
                IF @@TRANCOUNT > 0  
                      BEGIN
                      COMMIT TRANSACTION; 
                      RETURN 1;
                END
			END TRY

			BEGIN CATCH
				-- Si habia abierta una transaccion se cierra haciendo rollback.
				IF @@TRANCOUNT > 0  
					BEGIN
						ROLLBACK TRANSACTION;
                        SELECT ERROR_MESSAGE() AS ErrorMessage;
                        RETURN -1;
                  END
			END CATCH
	END

/*-----------------------------------------------------------------------------------------
									Procedimientos Classifier
-----------------------------------------------------------------------------------------*/

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado para listar todas los clasificadores>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_List_Classifiers
	AS 
	BEGIN
		SET NOCOUNT ON
        BEGIN TRANSACTION
			BEGIN TRY

				SELECT [id], [description] 
				FROM tb_classifiers
				ORDER BY [description]

				-- Si por alguna razon no se pudo ejecutar el query se lanza el error.
				IF @@ROWCOUNT = 0
					THROW 51000, 'An SQL error has occurred.', 1;  
				
				-- Si hay una transaccion abierta y se ejecuto el query completa la transaccion.
                IF @@TRANCOUNT > 0  
                      BEGIN
                      COMMIT TRANSACTION; 
                      RETURN 1;
                END
			END TRY

			BEGIN CATCH
				-- Si habia abierta una transaccion se cierra haciendo rollback.
				IF @@TRANCOUNT > 0  
					BEGIN
						ROLLBACK TRANSACTION;
                        SELECT ERROR_MESSAGE() AS ErrorMessage;
                        RETURN -1;
                  END
			END CATCH
	END

---------------------------------------------------------------------------------------------

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado para listar un clasificador especifico.>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_Get_Classifier
	@id SMALLINT
	AS 
    BEGIN
		SET NOCOUNT ON
			BEGIN TRANSACTION
				BEGIN TRY
					SELECT [id], [description]
					FROM tb_classifiers
					WHERE id = @id 
                      
				-- Si hay una transaccion abierta y se ejecuto el query completa la transaccion.
                IF @@TRANCOUNT > 0  
                      BEGIN
                      COMMIT TRANSACTION; 
                      RETURN 1;
                END
			END TRY

			BEGIN CATCH
				-- Si habia abierta una transaccion se cierra haciendo rollback.
				IF @@TRANCOUNT > 0  
					BEGIN
						ROLLBACK TRANSACTION;
                        SELECT ERROR_MESSAGE() AS ErrorMessage;
                        RETURN -1;
                  END
			END CATCH
	END


---------------------------------------------------------------------------------------------

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado para crear un clasificador.>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_Create_Classifier
	@description VARCHAR(50)
	
	AS 
    BEGIN
		SET NOCOUNT ON
			BEGIN TRANSACTION
				BEGIN TRY
					INSERT INTO tb_classifiers([description]) VALUES (@description)
  
				-- Si por alguna razon no se pudo ejecutar el query se lanza el error.
				IF @@ROWCOUNT = 0
					THROW 51000, 'An SQL error has occurred.', 1;  

				-- Si hay una transaccion abierta y se ejecuto el query completa la transaccion.
                IF @@TRANCOUNT > 0  
                      BEGIN
                      COMMIT TRANSACTION; 
                      RETURN 1;
                END
			END TRY

			BEGIN CATCH
				-- Si habia abierta una transaccion se cierra haciendo rollback.
				IF @@TRANCOUNT > 0  
					BEGIN
						ROLLBACK TRANSACTION;
                        SELECT ERROR_MESSAGE() AS ErrorMessage;
                        RETURN -1;
                  END
			END CATCH
	END


---------------------------------------------------------------------------------------------

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado para actualizar un clasificador.>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_Update_Classifier
	@id SMALLINT,
	@description VARCHAR(50)

	AS 
    BEGIN
		SET NOCOUNT ON
			BEGIN TRANSACTION
				BEGIN TRY
					UPDATE tb_classifiers
					SET [description] = @description
					WHERE @id = id


				-- Si por alguna razon no se pudo ejecutar el query se lanza el error.
				IF @@ROWCOUNT = 0
					THROW 51000, 'An SQL error has occurred.', 1;  

				-- Si hay una transaccion abierta y se ejecuto el query completa la transaccion.
                IF @@TRANCOUNT > 0  
                      BEGIN
                      COMMIT TRANSACTION; 
                      RETURN 1;
                END
			END TRY

			BEGIN CATCH
				-- Si habia abierta una transaccion se cierra haciendo rollback.
				IF @@TRANCOUNT > 0  
					BEGIN
						ROLLBACK TRANSACTION;
                        SELECT ERROR_MESSAGE() AS ErrorMessage;
                        RETURN -1;
                  END
			END CATCH
	END

---------------------------------------------------------------------------------------------

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado para eliminar un clasificador.>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_Delete_Classifier
	@id SMALLINT
	AS 
    BEGIN
		SET NOCOUNT ON
			BEGIN TRANSACTION
				BEGIN TRY
					DELETE FROM tb_classifiers
					WHERE @id = id


				-- Si por alguna razon no se pudo ejecutar el query se lanza el error.
				IF @@ROWCOUNT = 0
					THROW 51000, 'An SQL error has occurred.', 1;  

				-- Si hay una transaccion abierta y se ejecuto el query completa la transaccion.
                IF @@TRANCOUNT > 0  
                      BEGIN
                      COMMIT TRANSACTION; 
                      RETURN 1;
                END
			END TRY

			BEGIN CATCH
				-- Si habia abierta una transaccion se cierra haciendo rollback.
				IF @@TRANCOUNT > 0  
					BEGIN
						ROLLBACK TRANSACTION;
                        SELECT ERROR_MESSAGE() AS ErrorMessage;
                        RETURN -1;
                  END
			END CATCH
	END