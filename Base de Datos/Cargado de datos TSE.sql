
/*-------------------------------------------------------------------------*/
/* Carga de datos de paises de otra tabla */
INSERT INTO tb_countries([description],[country_code],[ENG]) 
	(
		SELECT [nombre],[iso3],[name] FROM tb_raw_countries
	);

-- Verificación
SELECT * FROM tb_countries

/*-------------------------------------------------------------------------*/
/* Carga de datos de localizacion apartir de datos crudos */

-- Carga de provincias
INSERT INTO tb_provinces ([description],[code],[id_country])
	(
		SELECT DISTINCT(province), SUBSTRING(CAST(code AS VARCHAR(6)),0,2),51  
		FROM tb_raw_localizations
		WHERE province != 'Consulado'
	)

-- Verificación
SELECT * FROM tb_provinces

-- Carga de cantones
INSERT INTO tb_cantons([description],[id_province],[code])
	(
		SELECT DISTINCT(canton),
		province.id,
		SUBSTRING(CAST(raw_localizations.code AS VARCHAR(6)),2,2) code
		FROM tb_raw_localizations as raw_localizations, tb_provinces as province
		WHERE province != 'Consulado' and province.description = province	
	)

-- Verificación
SELECT * FROM tb_cantons
/*-------------------------------------------------------------------------*/

-- Carga de distritos
INSERT INTO tb_districts([description],[id_canton],[code])
	(
		SELECT DISTRICT, c.id, SUBSTRING(CAST(t.code AS VARCHAR(6)),4,3)
		FROM tb_raw_localizations as t , tb_provinces as p, tb_cantons as c
		WHERE 
		 province = p.description
		AND canton = c.description
		AND c.id_province = p.id
	)

-- Verificación	
SELECT * FROM tb_districts

/*-------------------------------------------------------------------------*/

/* Carga de datos de usuarios apartir de datos crudos */

-- Creacion de tabla temporal con los codigos agrupados
CREATE TABLE #UnitedCode(code int,  district smallint)

INSERT INTO #UnitedCode
SELECT p.code * 100000 + c.code*1000  +d.code, id_canton
FROM tb_provinces as p, tb_cantons AS c, tb_districts AS d
WHERE	d.id_canton = c.id AND c.id_province = p.id

-- Verificación
SELECT * FROM #UnitedCode


INSERT INTO tb_users([identification],[name],[surname],[lastname],[id_district])
	(
		SELECT [identification], [name], [surname], [lastname], c.district
		FROM tb_raw_users as t, #UnitedCode as c
		WHERE t.district = c.code 
	)


-- Eliminacion de tabla temporal 
DROP TABLE #UnitedCode

-- Verificación
SELECT * FROM tb_users

/*-------------------------------------------------------------------------*/
/* Agregar datos antes de insertar los sexos de usuarios */
INSERT INTO tb_sexes ([description]) VALUES 
  ('Masculino')
, ('Femenino')

/*-------------------------------------------------------------------------*/

/* Carga de datos de sexo de otra tabla */

-- Promedio 53seg
UPDATE tb_users
SET id_sex = (sex)
FROM tb_users u inner join tb_raw_sexes s 
ON u.identification = s.identification;

-- Verificación
SELECT * FROM tb_users where id_sex is null
SELECT count(*) FROM tb_users 






