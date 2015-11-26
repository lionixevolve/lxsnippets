/*
 Ejecutar una función que esta en controlador hijo (ModalNoteCtrl) desde el controlador padre (HomeCtrl). El padre hace un broadcast y el hijo escucha. 
 Hay una tabla webix en el controlador padre con una lista de llamadas.
 Cuando desde el padre se le de clic a una fila de la tabla webix ejecutar la función de abrir popup que está en el controlador hijo.
 En la vista:
 <div ng-controller="HomeCtrl">
    
    <div webix-ui="historyDatatable_config" webix-data="call_list" webix-ready="getWebixObj(root)" id="historyDatatable"></div>
    
    <div ng-controller="ModalNoteCtrl">
               <script type="text/ng-template" id="callNote.html">
                <div class="modal-header">
                    <h3> {{call.full_name}}: {{call.service_c}} - {{call.options_c}} - {{call.result_c}} </h3>
                </div>
                <div class="modal-body">
                    <p> Notas:</p>
                    <div ng-repeat="note in call_notes_history">
                        <p>{{note}}</p>
                    </div>
                    <h5> Agregar una nueva nota:</h5>
                    <textarea ng-model="call_note" style="height: 150px;" class="form-control autosize"></textarea>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success btn-wide" ng-click="saveNote()">Guardar Nota</button>
                    <button class="btn btn-danger" ng-click="close()">Salir</button>
                    <!--<button class="btn btn-danger btn-o" ng-click="cancel()">Cancelar</button>-->
                </div>
            </script>
    </div>
    
 </div>
*/

//EN EL CONTROLADOR PADRRE (HomeCtrl)
app.controller('HomeCtrl', ["$scope", "crmService", "$localStorage", "CRM_REST_CONFIG", "$stateParams", "toaster", "$filter", "$http", "$rootScope", function ($scope, crmService, $localStorage, CRM_REST_CONFIG, $stateParams, toaster, $filter, $http, $rootScope) {
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
         ],
        autoheight: false,
        height: 500,
        autowidth: false,
        width: 1020,
        scroll: "xy",
        size: 10,
        fixedRowHeight: false,
        group: 5,
        on: {
            onItemClick: function (id) {
                var call = this.getItem(id);
                $scope.current_call_selected = call;
                //*** CUANDO SE LE DA CLIC A UNA FILA DE LA TABLA SE HACE UN BROADCAST AL ROOT SCOPE ***
                $rootScope.$broadcast('openNotePopup');
            }
        }
    };
}]);


//EN EL CONTROLADOR HIJO (ModalNoteCtrl)
app.controller('ModalNoteCtrl', ["$scope", "$modal", "$log", "$rootScope", function ($scope, $modal, $log, $rootScope) {
    //Popup Note
    $scope.openNotePopup = function () {
        var call = $scope.$parent.current_call_selected;

        //Pass email selected to modal instance
        var modalNoteInstance = $modal.open({
            templateUrl: 'callNote.html',
            controller: 'ModalNoteInstanceCtrl',
            size: 300,
            resolve: {
                call: function () {
                    return call;
                }
            }
        });

        modalNoteInstance.result.then(function () {
            $scope.$parent.loadContactHistory();
        }, function () {
            console.log('Modal dismissed');
        });

    };

    //***CUANDO SE EJECUTE EL BROADCAST EJECUTAR LA FUNCIÓN DE ABRIL EL POPUP ***
    var popupHandler = $rootScope.$on('openNotePopup', function (e) {
        $scope.openNotePopup();
    });
    $scope.$on("$destroy", popupHandler);

}]);