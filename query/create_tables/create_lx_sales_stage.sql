drop table `lx_sales_stage`;
CREATE TABLE `lx_sales_stage` (
    `id` varchar(36) NOT NULL,
    `type` varchar(100) NOT NULL,
    `value` varchar(100) NOT NULL,
    `name` varchar(100) NOT NULL,
    `sequence` decimal(4,2) NOT NULL,
    `date_entered` datetime DEFAULT NULL,
    `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted` tinyint(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('services-prospecto', 'services', 'prospecto', 'Prospecto', '1.00', '2015-11-13 19:13:07', '2015-11-14 16:15:45', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('services-cotizacion', 'services', 'cotizacion', 'Cotización', '2.00', '2015-11-13 19:13:07', '2015-11-14 16:15:45', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('services-promesa-verbal', 'services', 'promesa-verbal', 'Promesa verbal', '3.00', '2015-11-13 19:13:07', '2015-11-14 16:15:45', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('services-facturacion', 'services', 'facturacion', 'Facturación', '4.00', '2015-11-13 19:13:07', '2015-11-14 16:15:45', '0');

INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-prospecto', 'goods', 'prospecto', 'Prospecto', '1.00', '2015-11-13 19:13:07', '2015-11-14 16:08:54', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-cotizando', 'goods','cotizando', 'Cotizando', '2.00', '2015-11-13 19:13:07', '2015-11-14 16:07:49', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-cotizado', 'goods','cotizado', 'Cotizado', '3.00', '2015-11-13 19:13:07', '2015-11-14 16:14:01', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-modificaciones', 'goods','modificaciones', 'Modificaciones', '3.10', '2015-11-13 19:13:07', '2015-11-14 16:14:01', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-perdida', 'goods','perdida', 'Perdida', '3.20', '2015-11-13 19:13:07', '2015-11-14 16:14:01', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-orden-compra', 'goods','orden-de-compra', 'Orden de compra', '4.00', '2015-11-13 19:13:07', '2015-11-14 16:14:01', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-pedido-revision', 'goods','pedido-en-revision', 'Pedido en revisión', '5.00', '2015-11-13 19:13:07', '2015-11-14 16:14:01', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-proveedores', 'goods','pedido-a-proveedores', 'Pedido a proveedores', '6.00', '2015-11-13 19:13:07', '2015-11-14 16:14:01', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-inventariado', 'goods','inventariado-de-pedido-a-proveedores', 'Inventariado de pedido a proveedores', '7.00', '2015-11-13 19:13:07', '2015-11-14 16:14:01', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-incompleto', 'goods','pedido-a-proveedores-incompleto', 'Pedido a proveedores incompleto', '7.10', '2015-11-13 19:13:07', '2015-11-14 16:14:01', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-ingenieria', 'goods','ingenieria', 'Ingeniería', '7.20', '2015-11-13 19:13:07', '2015-11-14 16:14:01', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-atp', 'goods','atp', 'ATP (Acceptance Test Procedure)', '7.30', '2015-11-13 19:13:07', '2015-11-14 16:14:01', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-facturar', 'goods','facturar', 'Facturar', '8.00', '2015-11-13 19:13:07', '2015-11-14 16:14:01', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-facturado', 'goods','facturado', 'Facturado', '9.00', '2015-11-13 19:13:07', '2015-11-14 16:14:01', '0');
INSERT INTO `netcom_crm`.`lx_sales_stage` (`id`,`type`, `value`, `name`, `sequence`, `date_entered`, `date_modified`, `deleted`) VALUES ('goods-ganado', 'goods','ganado', 'Ganado', '10.00', '2015-11-13 19:13:07', '2015-11-14 16:14:01', '0');
