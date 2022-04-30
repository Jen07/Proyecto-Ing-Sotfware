
/* Carga de datos de localizacion apartir de datos crudos */

-- Carga de provincias
INSERT INTO tb_provinces ([description],[id])
	(
		SELECT DISTINCT(province), SUBSTRING(CAST(code AS VARCHAR(6)),0,2)  
		FROM tb_raw_localization 
		WHERE province != 'Consulado'
	)

-- Verificación
SELECT * FROM tb_provinces

-- Carga de cantones
INSERT INTO tb_cantons([description],[id_province],[id])
	(
		SELECT DISTINCT(canton), 
		SUBSTRING(CAST(code AS VARCHAR(6)),0,2),
		SUBSTRING(CAST(code AS VARCHAR(6)),2,2)
		FROM tb_raw_localization
		WHERE province != 'Consulado' 	
	)

-- Verificación
SELECT * FROM tb_cantons

/*-------------------------------------------------------------------------*/

-- Carga de distritos
INSERT INTO tb_districts([description],[id_province],[id_canton],[id])
	(
		SELECT DISTINCT(district), 
		SUBSTRING(CAST(code AS VARCHAR(6)),0,2),
		SUBSTRING(CAST(code AS VARCHAR(6)),2,2),
		SUBSTRING(CAST(code AS VARCHAR(6)),4,3)
		FROM tb_raw_localization
		WHERE province != 'Consulado' 	
	)

-- Verificación	
SELECT * FROM tb_districts

/*-------------------------------------------------------------------------*/

/* Carga de datos de usuarios apartir de datos crudos */
INSERT INTO tb_users([identification],[name],[surname],[lastname],[id_province],[id_canton],[id_district])
	(
		SELECT [identification], [name], [surname], [lastname],
			SUBSTRING(CAST([district] AS VARCHAR(6)),0,2) as [province],
			SUBSTRING(CAST([district] AS VARCHAR(6)),2,2) as [canton],
			SUBSTRING(CAST([district] AS VARCHAR(6)),4,3) as [district]
		FROM tb_raw_user_data
		WHERE SUBSTRING(CAST([district] AS VARCHAR(6)),0,2)  != '8'
	)

-- Verificación
SELECT * FROM tb_users

/*-------------------------------------------------------------------------*/
/* Agregar datos antes de insertar los sexos de usuarios */
INSERT INTO tb_sexes ([description]) VALUES 
  ('Masculino')
, ('Femenino')

/*-------------------------------------------------------------------------*/
/* Carga de datos de sexo de otra tabla */
UPDATE tb_users
SET id_sex = (sex)
FROM tb_users u inner join tb_raw_sexes s 
ON u.identification = s.identification;

-- Verificación
SELECT * FROM tb_users