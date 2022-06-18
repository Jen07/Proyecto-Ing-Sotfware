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

				SELECT dep.[id], dep.[description] AS [description], CONCAT(TRIM(d.[description]), ', ', TRIM(c.[description]), ', ',TRIM(p.[description]) , ', ' , TRIM( l.[description])) AS [district] 
				FROM tb_departments dep, tb_districts d, tb_cantons c, tb_provinces p, tb_countries l
				WHERE dep.id_district = d.id and d.id_canton = c.id AND c.id_province = p.id AND p.id_country = l.id
				
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
					SELECT dep.[id], dep.[description] AS [description], dis.[id] AS [district] 
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





/*-----------------------------------------------------------------------------------------
									Procedimientos District
-----------------------------------------------------------------------------------------*/

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado obtener los datos de los distritos>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_List_Districts
	AS 
	BEGIN
		SET NOCOUNT ON
        BEGIN TRANSACTION
			BEGIN TRY

				SELECT  [id], [description], [id_canton]
				FROM tb_districts

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



-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado obtener los datos de un distrito>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_Get_District
	@id SMALLINT
	AS 
	BEGIN
		SET NOCOUNT ON
        BEGIN TRANSACTION
			BEGIN TRY

				SELECT  d.[id],l.[description] as country, p.[description] AS province,c.[description] AS canton, d.[description] AS district, 
				l.id country_id,p.id province_id,c.id canton_id FROM tb_districts d, tb_cantons c, tb_provinces p, tb_countries l
				WHERE d.id_canton = c.id AND c.id_province = p.id AND p.id_country = l.id AND @id = d.id

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
									Procedimientos Canton
-----------------------------------------------------------------------------------------*/

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado obtener los datos de los cantones>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_List_Cantons
	AS 
	BEGIN
		SET NOCOUNT ON
        BEGIN TRANSACTION
			BEGIN TRY

				SELECT  [id], [description], [id_province]
				FROM tb_cantons

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
									Procedimientos Province
-----------------------------------------------------------------------------------------*/

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado obtener los datos de las provincias>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_List_Provinces
	AS 
	BEGIN
		SET NOCOUNT ON
        BEGIN TRANSACTION
			BEGIN TRY

				SELECT  [id], [description], [id_country]
				FROM tb_provinces

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
									Procedimientos Pais
-----------------------------------------------------------------------------------------*/

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado obtener los datos de los paises>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_List_Countries
	AS 
	BEGIN
		SET NOCOUNT ON
        BEGIN TRANSACTION
			BEGIN TRY

				SELECT  [id], [description]
				FROM tb_countries

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

	GO
-- =============================================
-- Author:		<Author,Jennifer>
-- Create date: <Create Date,25/05/2022>
-- Description:	<Description,Verificar Login>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[sp_Login]
	@email VARCHAR(50),
	@password VARCHAR(12)
AS
BEGIN
	-- SET NOCOUNT on;

	 SELECT u.id
	 FROM tb_users u 
	 where u.email = @email and (PWDCOMPARE(@password, u.password) =1);
   
	END


Go
-- =============================================
-- Author:		<Author,Jennifer>
-- Create date: <Create Date,25/05/2022>
-- Description:	<Description,Verificar Secrect>
-- =============================================
CREATE OR ALTER PROCEDURE  [dbo].[sp_VerifyCode]
	@id int
AS
BEGIN
	-- SET NOCOUNT off;

	 SELECT a.secret
	 FROM tb_users u inner join tb_authenticators a
	 on u.id = a.id
	 and u.id = @id
   
END


-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 30/5/22>
-- Description:	<Description, Metodo utilizado obtener los datos de un usuario debidamente autenticado>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_GetAuthenticatedUser
	@id VARCHAR(9)
	AS 
	BEGIN
		SET NOCOUNT ON
        BEGIN TRANSACTION
			BEGIN TRY

				SELECT u.[id], u.[identification], u.[name], u.[surName], u.[lastName], u.[birthdate], u.[email], u.[phone], u.[id_sex], d.[description] as [department]
				FROM tb_users u, tb_departments d
				WHERE u.id_department = d.id AND u.id = @id

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







-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 30/5/22>
-- Description:	<Description, Metodo utilizado obtener la foto de un usuario debidamente autenticado>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_GetAuthenticatedPicture
	@id VARCHAR(9)
	AS 
	BEGIN
		SET NOCOUNT ON
        BEGIN TRANSACTION
			BEGIN TRY

				SELECT u.[picture]
				FROM tb_users u
				WHERE u.id = @id

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




-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 5/6/22>
-- Description:	<Description, Metodo utilizado para listar todas las solicitudes de un usuario>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_List_User_Requests
	@id VARCHAR(9)
	AS 
	BEGIN
		SET NOCOUNT ON
        BEGIN TRANSACTION
			BEGIN TRY

				SELECT r.[id], r.[date], r.[keyword], r.[issue], r.[changes], r.[response_detail], r.[response_date], r.[attachments], r.[id_classifier], r.[id_legal_response], r.[id_response_user], CONCAT(TRIM(s.name),' ',TRIM(s.surname),' ',TRIM(s.lastname)) as username, c.description as classifier
				FROM tb_requests r, tb_users s, tb_classifiers c
				WHERE id_user = @id AND r.id_user = s.id AND c.id = r.id_classifier
				ORDER BY [date] desc
				
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

/*--------------------------------------------------------------------------------------------------*/
	
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado para crear una solicitud.>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_Create_Request
	@user_id INT,
	@issue VARCHAR(60),
	@classifier SMALLINT,
	@keyword VARCHAR(30),
	@attachments SMALLINT
	AS 
    BEGIN
		SET NOCOUNT ON
			BEGIN TRANSACTION
				BEGIN TRY
					INSERT INTO tb_requests([date],[keyword],[issue],[changes],[attachments],[id_user],[id_classifier],[id_legal_response]) 
					VALUES (GETDATE(),@keyword,@issue,0,@attachments,@user_id,@classifier,2)
					SELECT SCOPE_IDENTITY () AS id
				
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

	
/*--------------------------------------------------------------------------------------------------*/
	
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado para agregar adjuntos a la solicitud.>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_Create_Attachment
	@request_id INT,
	@line SMALLINT,
	@file VARCHAR(MAX),
	@comment VARCHAR(50)
	AS 
    BEGIN
		SET NOCOUNT ON
			BEGIN TRANSACTION
				BEGIN TRY
					INSERT INTO tb_request_attachments([id_request],[line],[file],[comment]) 
					VALUES (@request_id, @line, @file, @comment)
  
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


	
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 17/5/22>
-- Description:	<Description, Metodo utilizado para eliminar una solicitud y sus adjuntos>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_Delete_Request
	@request_id INT
	
	AS 
    BEGIN
		SET NOCOUNT ON
			BEGIN TRANSACTION
				BEGIN TRY
					DELETE FROM tb_request_attachments WHERE id_request = @request_id
					DELETE FROM tb_requests WHERE id = @request_id
  
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


-- =============================================
-- Author:		<Author, Luis Leiton>
-- Create date: <Create Date, 13/6/22>
-- Description:	<Description, Metodo utilizado para listar todas las solicitudes>
-- =============================================

GO 
	CREATE OR ALTER PROCEDURE sp_List_All_Requests
	AS 
	BEGIN
		SET NOCOUNT ON
        BEGIN TRANSACTION
			BEGIN TRY

				SELECT r.[id], r.[date], r.[keyword], r.[issue], r.[changes], r.[response_detail], r.[response_date], r.[attachments], r.[id_classifier], r.[id_legal_response], r.[id_response_user], CONCAT(TRIM(s.name),' ',TRIM(s.surname),' ',TRIM(s.lastname)) as username, c.description as classifier
				FROM tb_requests r, tb_users s, tb_classifiers c
				WHERE r.id_user = s.id AND c.id = r.id_classifier
				ORDER BY [date] desc
				
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

/*--------------------------------------------------------------------------------------------------*/