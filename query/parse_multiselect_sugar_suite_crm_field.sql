-- Example field looks like this:
-- '^cobros^,^lineadeservicioalcliente^,^telemercadeo^,^actualizacionbd^,^encuestas^,^agentesensitio^,^tecnologia^,^campanasmasivas^,^redessociales^'
-- I only partially parse the field (eg: cobros and telemercadeo didn't need parsing) and obtain this:
-- 'cobros,línea de servicio al cliente,telemercadeo,actualización base de datos,encuestas,agentes en sitio,tecnología,campañas masivas,redes sociales'
select
id_c
,replace(replace(replace(replace(replace(replace(replace(replace(servicetype_c
,'lineadeservicioalcliente', 'línea de servicio al cliente')
,'actualizacionbd', 'actualización base de datos')
,'agentesensitio', 'agentes en sitio')
,'tecnologia', 'tecnología')
,'campanasmasivas', 'campañas masivas')
,'redessociales', 'redes sociales')
,'^,^', ',')
,'^', ''
) as 'Tipo de Servicio'
,servicetype_c
from opportunities_cstm
where servicetype_c is not null
