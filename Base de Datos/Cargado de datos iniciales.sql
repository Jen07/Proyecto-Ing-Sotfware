
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
, ('Auditoría Interna',04)
, ('Tecnología de la Informática',05)
, ('Unidad de Planificación Institucional',06)
, ('Área Administrativa y Financiera',07)
, ('Recursos Humanos',08)
, ('Unidad de Finanzas',09)
, ('Unidad de Proveeduría',10)
, ('Proceso de Transporte',11)
, ('Servicio y Mantenimiento',12)
, ('Investigación y desarrollo',13);


select * from tb_users