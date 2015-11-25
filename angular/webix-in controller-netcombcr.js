/* Obtener los datos de la llamada del API , crear la tabla de webix y pasarle los datos 
 Contenedor en el html 
<div id="pendingDatatable"></div> 
 */
crmService.getCallsByStatus('Pending') // Servicio que llama al API
            .then(function (html) {
                var call_list = html.data;
                //Table WEBIX 
                var pendingDatatable = new webix.ui({
                    container: "pendingDatatable",
                    view: "datatable",
                    columns: [
                        //Se pasa la fecha a string
                        {
                            id: "date_entered",
                            header: "Fecha",
                            format: webix.i18n.fullDateFormatDate(),
                            sort: "string",
                            width: 150
                        },
                        //El campo lxcode_c va a tener un input para filtrar
                        {
                            id: "lxcode_c",
                            header: ["# Caso", {
                                content: "textFilter"
                        }],
                            sort: "string",
                            width: 90
                        },
                        //El campo service_c va a tener un dropdown para filtrar
                        {
                            id: "service_c",
                            header: ["Servicio", {
                                content: "selectFilter"
                            }],
                            sort: "string",
                            width: 150
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
                            id: "callresult_c",
                            header: "Result",
                            sort: "string",
                            width: 100
                    },
                        {
                            id: "status",
                            header: ["Status", {
                                content: "selectFilter"
                        }],
                            sort: "string",
                            width: 100
                    },
                        {
                            id: "created_username",
                            header: ["Creado por", {
                                content: "selectFilter"
                        }],
                            sort: "string",
                            width: 100
                    },
                        {
                            id: "assigned_username",
                            header: ["Asignado a", {
                                content: "selectFilter"
                        }],
                            width: 100
                    }
                ],
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

                //Ordenar tabla por fecha 
                pendingDatatable.sort("#date_entered#", "desc", "string");
                pendingDatatable.markSorting("date_entered", "desc");
                //Auto ajustar columnas  
                pendingDatatable.adjustRowHeight("options_c");
                pendingDatatable.adjustRowHeight("result_c");

                //Cuando se le da clic a un fila 
                pendingDatatable.attachEvent("onItemClick", function (id) {
                    //Obtener info de la fila seleccionada
                    var call = this.getItem(id);
                    //Ir a otra vista con ids como parámetros parte de la URL
                    $state.go('app.home', {
                        'contactId': call.contact_id,
                        'callId': call.id_c
                    });
                });
            });