
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

INSERT INTO tb_departments([description]) VALUES 
  ('Consejo Directivo')
, ('Gerencia')
, ('Subgerencia')
, ('Auditor�a Interna')
, ('Tecnolog�a de la Inform�tica')
, ('Unidad de Planificaci�n Institucional')
, ('�rea Administrativa y Financiera')
, ('Recursos Humanos')
, ('Unidad de Finanzas')
, ('Unidad de Proveedur�a')
, ('Proceso de Transporte')
, ('Servicio y Mantenimiento')
, ('Investigaci�n y desarrollo');


select * from tb_users