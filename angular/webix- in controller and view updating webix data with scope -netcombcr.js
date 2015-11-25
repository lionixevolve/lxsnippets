/*
Creamos la tabla de webix en la vista y le pasamos la configuración que creamos en el controlador y cuando este lista llamamos una función que le pasamos toda la tabla
Tabla de webix en la vista: <div webix-ui="historyDatatable_config" webix-data="call_list" webix-ready="getWebixObj(root)" id="historyDatatable"></div>
*/

//configuración de la tabla de webix sin la data 
$scope.historyDatatable_config = {
        view: "datatable",
        columns: [
            {
                id: "date_entered",
                header: "Fecha",
                format: webix.i18n.fullDateFormatDate(),
                sort: "string",
                width: 200
                                            },
            {
                id: "lxcode_c",
                header: ["# Caso", {
                    content: "textFilter"
                                            }],
                sort: "int",
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
                id: "assigned_username",
                header: "Asignado a",
                width: 100
                                            }
                                        ],
        autoheight: false,
        height: 500,
        autowidth: false,
        width: 1020,
        scroll: "xy",
        size: 10,
        fixedRowHeight: false,
        group: 5,
        //Cuando se le da click a fila de webix
        on: {
            onItemClick: function (id) {
                var call = this.getItem(id);
                $scope.current_call_selected = call;
                //Open popup
                $rootScope.$broadcast('openNotePopup');
            }
        }
    };

 
//Obtener ta tabla de webix la vista y ponerla en una variable del scope
$scope.getWebixObj = function (root) {
    $scope.historyTable = root;
};

//Pasarle la data a la tabla de webix y ordenar la tabla por fecha 
$scope.loadContactHistory = function () {
        crmService.getCallsByContactId($scope.contact.id)
            .then(function (html) {
                $scope.call_list = html.data;
                //Todo
                //bug order datatable afer 2 second
                setTimeout(function () {
                    $scope.historyTable.sort("#date_entered#", "desc", "string");
                    $scope.historyTable.markSorting("date_entered", "desc");
                }, 2000);
            });
};



