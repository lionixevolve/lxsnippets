 /*
  Descargar Excel. Debemos crear la tabla dewebix y ponerle entre sus atributos "export: true"
  En botón en la vista: <input type="button" value="Descargar Excel" style='width:400px;margin:25px;' ng-click="exportExcel()">
  Contenedor de la tabla: <div id="callsDatatable"></div>
*/
 
 //Webix datatable con "export: true"
 var callsDatatable = new webix.ui({
                    container: "callsDatatable",
                    view: "datatable",
                    columns: [
                        {
                            id: "date_entered",
                            header: "Fecha",
                            format: webix.i18n.fullDateFormatDate(),
                            sort: "string",
                            width: 150
                    },
                        {
                            id: "lxcode_c",
                            header: ["# Caso", {
                                content: "textFilter"
                        }],
                            sort: "string",
                            width: 90
                    },
                        {
                            id: "created_username",
                            header: ["Usuario", {
                                content: "selectFilter"
                        }],
                            sort: "string",
                            width: 100
                    },
                        {
                            id: "callresult_c",
                            header: ["Estado", {
                                content: "selectFilter"
                        }],
                            sort: "string",
                            width: 200
                    },
                        {
                            id: "description",
                            header: ["Notas", {
                                content: "textFilter"
                        }],
                            width: 300
                    },
                        {
                            id: "service_c",
                            header: ["Servicio", {
                                content: "selectFilter"
                        }],
                            sort: "string",
                            width: 200
                    },
                        {
                            id: "options_c",
                            header: ["Opción", {
                                content: "selectFilter"
                        }],
                            sort: "string",
                            width: 200
                    },
                        {
                            id: "result_c",
                            header: ["Transacción", {
                                content: "selectFilter"
                        }],
                            sort: "string",
                            width: 200
                    },
                        {
                            id: "full_name",
                            header: ["Nombre Completo", {
                                content: "textFilter"
                        }],
                            sort: "string",
                            width: 200
                    },
                        {
                            id: "assigned_username",
                            header: ["Asignado a", {
                                content: "selectFilter"
                        }],
                            sort: "string",
                            width: 100
                    }
                ],
                    export: true,
                    data: call_list,
                    autoheight: false,
                    height: 500,
                    autowidth: false,
                    width: 1000,
                    scroll: "xy",
                    size: 10,
                    fixedRowHeight: false,
                    group: 5
                });

//Función  para descargar excel
$scope.exportExcel = function () {
    callsDatatable.exportToExcel();
};
 