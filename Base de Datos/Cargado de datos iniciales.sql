
INSERT INTO tb_legal_responses([description]) VALUES 
  ('Pendiente')
, ('Resuelto')
, ('Ampliar Solicitud');

INSERT INTO tb_classifiers([description]) VALUES 
  ('Consulta general')
, ('Contrato Proveedores')
, ('Contrato Personal')
, ('Normativa o ley internacional')
, ('Normativa o ley nacional')
, ('Otro');

INSERT INTO tb_departments([description],[id_district]) VALUES 
  ('Consejo Directivo',01)
, ('Gerencia',02)
, ('Subgerencia',03)
, ('Auditor�a Interna',04)
, ('Tecnolog�a de la Inform�tica',05)
, ('Unidad de Planificaci�n Institucional',06)
, ('�rea Administrativa y Financiera',07)
, ('Recursos Humanos',08)
, ('Unidad de Finanzas',09)
, ('Unidad de Proveedur�a',10)
, ('Proceso de Transporte',11)
, ('Servicio y Mantenimiento',12)
, ('Investigaci�n y desarrollo',13);


select * from tb_users