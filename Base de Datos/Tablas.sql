--Integrantes 
--Jennfier Granados B83547
--Luis Leitón B94216

-- Creación de base de datos
CREATE DATABASE db_ing;

-- Creación de login
USE [master]
CREATE LOGIN [root] WITH PASSWORD=N'root', DEFAULT_DATABASE=[master], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
ALTER SERVER ROLE [sysadmin] ADD MEMBER [root]

-- Creación de usuario
USE [db_ing]
CREATE USER [root] FOR LOGIN [root] WITH DEFAULT_SCHEMA=[dbo]

-- Creación de tablas
CREATE TABLE tb_countries(
	[id] SMALLINT PRIMARY KEY IDENTITY(1,1),
	[description] NVARCHAR(45) UNIQUE NOT NULL,
	[ENG] NVARCHAR(45) UNIQUE NOT NULL,
	[country_code] VARCHAR(3) UNIQUE NOT NULL
);

CREATE TABLE tb_provinces(
	[id] TINYINT PRIMARY KEY IDENTITY(1,1),
	[code] TINYINT UNIQUE NOT NULL,
	[description] NVARCHAR(10) UNIQUE NOT NULL,
	
	[id_country] SMALLINT NOT NULL,
	CONSTRAINT fk_country_province 
	FOREIGN KEY ([id_country]) 
	REFERENCES tb_countries([id])
);

CREATE TABLE tb_cantons(
	[id] TINYINT PRIMARY KEY IDENTITY(1,1),
	[code] TINYINT NOT NULL,
	[description] NVARCHAR(20) NOT NULL,

	[id_province] TINYINT NOT NULL,
	CONSTRAINT fk_province_canton 
	FOREIGN KEY ([id_province]) 
	REFERENCES tb_provinces([id])
);

CREATE TABLE tb_districts(
	[id] SMALLINT PRIMARY KEY IDENTITY(1,1),
	[code] SMALLINT NOT NULL,
	[description] NVARCHAR(34) NOT NULL,
	
	[id_canton] TINYINT NOT NULL,
	CONSTRAINT fk_district_canton
	FOREIGN KEY ([id_canton]) 
	REFERENCES tb_cantons([id]),
);

CREATE TABLE tb_sexes(
	[id] TINYINT IDENTITY(1,1) PRIMARY KEY,
	[description] VARCHAR(25) UNIQUE NOT NULL,
);

CREATE TABLE tb_legal_responses(
	[id] TINYINT IDENTITY(1,1) PRIMARY KEY,
	[description] VARCHAR(25) UNIQUE NOT NULL,
);

CREATE TABLE tb_departments(
	[id] SMALLINT IDENTITY(1,1) PRIMARY KEY,
	[description] VARCHAR(50) UNIQUE NOT NULL,

	[id_district] SMALLINT NOT NULL,
	CONSTRAINT fk_department_district 
	FOREIGN KEY ([id_district]) 
	REFERENCES tb_districts([id]),
); 


CREATE TABLE tb_classifiers(
	[id] SMALLINT IDENTITY(1,1) PRIMARY KEY,
	[description] VARCHAR(50) UNIQUE NOT NULL,
);

CREATE TABLE tb_users(
	[id] INT IDENTITY(1,1) PRIMARY KEY,
	[identification] VARCHAR(9) UNIQUE NOT NULL,
	[name] NVARCHAR(30) NOT NULL,
	[surname] NVARCHAR(26) NOT NULL,
	[lastname] NVARCHAR(26) NOT NULL,
	[picture] VARCHAR(MAX),	
	[birthdate] SMALLDATETIME,
	[email] VARCHAR(50),
	[phone] VARCHAR(12),
	[password] VARBINARY(MAX),

	[id_district] SMALLINT NOT NULL,
	CONSTRAINT fk_user_district 
	FOREIGN KEY ([id_district]) 
	REFERENCES tb_districts([id]),

	[id_sex] TINYINT,
	CONSTRAINT fk_user_sex 
	FOREIGN KEY ([id_sex]) 
	REFERENCES tb_sexes([id]),

	[id_department] SMALLINT,
	CONSTRAINT fk_user_department 
	FOREIGN KEY ([id_department]) 
	REFERENCES tb_departments([id])
)


CREATE TABLE tb_requests(
	[id] INT PRIMARY KEY IDENTITY(1,1),	
	[date] SMALLDATETIME NOT NULL,
	[keyword] VARCHAR(30) NOT NULL,
	[issue] VARCHAR(60) NOT NULL,
	[changes] TINYINT NOT NULL,
	[response_detail] VARCHAR(60) NOT NULL,
	[response_date] SMALLDATETIME NOT NULL,
	[attachments] TINYINT NOT NULL,

	[id_user] INT NOT NULL,
	CONSTRAINT fk_user_request
	FOREIGN KEY ([id_user]) 
	REFERENCES tb_users([id]),

	[id_classifier] SMALLINT NOT NULL,
	CONSTRAINT fk_classifier_request 
	FOREIGN KEY ([id_classifier]) 
	REFERENCES tb_classifiers([id]),

	[id_legal_response] TINYINT NOT NULL,
	CONSTRAINT fk_legal_response_request
	FOREIGN KEY ([id_legal_response]) 
	REFERENCES tb_legal_responses([id]),

	[id_response_user] INT NOT NULL,
	CONSTRAINT fk_response_user_request
	FOREIGN KEY ([id_response_user]) 
	REFERENCES tb_users([id])
)

CREATE TABLE tb_request_attachments(
	[id_request] INT,		
	[line] SMALLINT NOT NULL,					
	[file] VARCHAR(MAX) NOT NULL,	
	[comment] VARCHAR(50),

	PRIMARY KEY ([id_request],[line]),
	CONSTRAINT fk_request_request_attachments 
	FOREIGN KEY ([id_request]) 
	REFERENCES tb_requests([id])
)

-- Tabla de bitácoras.
CREATE TABLE tb_binnacles(
	[id] INT PRIMARY KEY IDENTITY(1,1),
	[ip] VARCHAR (15) NOT NULL,					
	[date] SMALLDATETIME NOT NULL,
	[description] VARCHAR(60) NOT NULL,			

	[id_user] INT NOT NULL,		
	CONSTRAINT fk_user_binnacle 
	FOREIGN KEY ([id_user]) 
	REFERENCES  tb_users([id])
)


-- Tabla de 2FA
CREATE TABLE tb_authenticators(
	[id] INT PRIMARY KEY,
	[secret] varchar(50) NOT NULL,

	CONSTRAINT fk_user_authenticator
	FOREIGN KEY ([id]) 
	REFERENCES  tb_users([id])
)