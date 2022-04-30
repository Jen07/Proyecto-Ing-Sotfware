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

CREATE TABLE tb_provinces(
	[id] TINYINT PRIMARY KEY,
	[description] VARCHAR(10)
);

CREATE TABLE tb_cantons(
	[id] TINYINT ,
	[description] VARCHAR(20) NOT NULL,
	[id_province] TINYINT NOT NULL,
	
	PRIMARY KEY ([id], [id_province]),
	CONSTRAINT fk_province_canton 
	FOREIGN KEY ([id_province]) 
	REFERENCES tb_provinces([id])
);

CREATE TABLE tb_districts(
	[id] SMALLINT,
	[description] VARCHAR(34) NOT NULL,
	[id_canton] TINYINT NOT NULL,
	[id_province] TINYINT NOT NULL,

	PRIMARY KEY ([id], [id_province],[id_canton]),

	CONSTRAINT fk_district_canton
	FOREIGN KEY ([id_canton],[id_province]) 
	REFERENCES tb_cantons([id],[id_province]),
);

CREATE TABLE tb_sexes(
	[id] TINYINT IDENTITY(1,1) PRIMARY KEY,
	[description] VARCHAR(25) UNIQUE NOT NULL,
);

CREATE TABLE tb_legal_responses(
	[id] SMALLINT IDENTITY(1,1) PRIMARY KEY,
	[description] VARCHAR(25) UNIQUE NOT NULL,
	[national] BIT NOT NULL
);

CREATE TABLE tb_departments(
	[id] SMALLINT IDENTITY(1,1) PRIMARY KEY,
	[description] VARCHAR(50) UNIQUE NOT NULL,

	[id_district] SMALLINT NOT NULL,
	[id_canton] TINYINT NOT NULL,
	[id_province] TINYINT NOT NULL,
	[is_national] BIT NOT NULL,
	[id_country] SMALLINT NOT NULL,

	CONSTRAINT fk_department_district 
	FOREIGN KEY ([id_district],[id_province],[id_canton]) 
	REFERENCES tb_districts([id],[id_province],[id_canton]),
); 


CREATE TABLE tb_classifiers(
	[id] SMALLINT IDENTITY(1,1) PRIMARY KEY,
	[description] VARCHAR(50) UNIQUE NOT NULL,
);

CREATE TABLE tb_users(
	[id] int IDENTITY(1,1) PRIMARY KEY,
	[identification] VARCHAR(9) UNIQUE NOT NULL,
	[name] VARCHAR(30) NOT NULL,
	[surname] VARCHAR(26) NOT NULL,
	[lastname] VARCHAR(26) NOT NULL,
	[id_sex] TINYINT NOT NULL,
	[picture] VARCHAR(MAX) NOT NULL,	
	[birthdate] DATE NOT NULL,
	[id_department] SMALLINT NOT NULL,
	[email] VARCHAR(50) NOT NULL,
	[phone] VARCHAR(12) NOT NULL,
	[password] VARBINARY(MAX) NOT NULL,

	[id_district] SMALLINT NOT NULL,
	[id_canton] TINYINT NOT NULL,
	[id_province] TINYINT NOT NULL,

	CONSTRAINT fk_user_district 
	FOREIGN KEY ([id_district],[id_province],[id_canton]) 
	REFERENCES tb_districts([id],[id_province],[id_canton]),

	CONSTRAINT fk_user_sex 
	FOREIGN KEY ([id_sex]) 
	REFERENCES tb_sexes([id]),

	CONSTRAINT fk_user_department 
	FOREIGN KEY ([id_department]) 
	REFERENCES tb_departments([id])
)


CREATE TABLE tb_requests(
	[id] INT PRIMARY KEY IDENTITY(1,1),	
	[date] DATETIME NOT NULL,
	[id_user] INT NOT NULL,
	[keyword] VARCHAR(30) NOT NULL,
	[issue] VARCHAR(60) NOT NULL,
	[changes] SMALLINT NOT NULL,
	[id_classifier] SMALLINT NOT NULL,
	[id_legal_response] SMALLINT NOT NULL,
	[response_detail] VARCHAR(60) NOT NULL,
	[response_date] DATETIME NOT NULL,
	[id_response_user] INT NOT NULL,
	[attachments] SMALLINT NOT NULL,

	CONSTRAINT fk_user_request
	FOREIGN KEY ([id_user]) 
	REFERENCES tb_users([id]),

	CONSTRAINT fk_classifier_request 
	FOREIGN KEY ([id_classifier]) 
	REFERENCES tb_classifiers([id]),

	CONSTRAINT fk_legal_response_request
	FOREIGN KEY ([id_legal_response]) 
	REFERENCES tb_legal_responses([id]),

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
CREATE TABLE tb_binnacle(
	[id] INT PRIMARY KEY IDENTITY(1,1),
	[ip] VARCHAR (15) NOT NULL,					
	[date] DATETIME NOT NULL,
	[id_user] INT NOT NULL,						
	[description] VARCHAR(60) NOT NULL,			

	CONSTRAINT fk_user_binnacle 
	FOREIGN KEY ([id_user]) 
	REFERENCES  tb_users([id])
)


-- Tabla de 2FA
CREATE TABLE tb_authenticator(
	[id] int PRIMARY KEY,
	[secret] varchar(50) NOT NULL,
	CONSTRAINT fk_user_authenticator
	FOREIGN KEY ([id]) 
	REFERENCES  tb_users([id])
)