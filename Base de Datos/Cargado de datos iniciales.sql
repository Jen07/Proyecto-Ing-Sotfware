
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
, ('Auditoría Interna')
, ('Tecnología de la Informática')
, ('Unidad de Planificación Institucional')
, ('Área Administrativa y Financiera')
, ('Recursos Humanos')
, ('Unidad de Finanzas')
, ('Unidad de Proveeduría')
, ('Proceso de Transporte')
, ('Servicio y Mantenimiento')
, ('Investigación y desarrollo');


select * from tb_users