/*
Ejecutar una función que está en el controlador padre(HomeCtrl) desde el controlador hijo(ModalNoteCtrl).
Cuando se sierre el popup de nota que está en el controlador hijo se refresque la tabla webix que está en el controlador padre con el listado de las llamadas.
 En la vista:
 <div ng-controller="HomeCtrl">
    //webix table 
    <div ng-controller="ModalNoteCtrl">
        //popup codigo
    </div>
 </div>
*/

//EN EL CONTROLADOR PADRRE (HomeCtrl)
app.controller('HomeCtrl', ["$scope", "crmService", "$localStorage", "CRM_REST_CONFIG", "$stateParams", "toaster", "$filter", "$http", "$rootScope", function ($scope, crmService, $localStorage, CRM_REST_CONFIG, $stateParams, toaster, $filter, $http, $rootScope) {
   //Load contact history in webix
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
            //***CUANDO SE CIERRE EL POPUP EJECUTAR LA FUNCIÓN QUE REFRESCA LOS DATOS DE LA TABLA WEBIX QUE ESTÁ EN EL CONTROLADOR PADRE (HomeCtrl) ***
            $scope.$parent.loadContactHistory();
        }, function () {
            console.log('Modal dismissed');
        });

    };

    var popupHandler = $rootScope.$on('openNotePopup', function (e) {
        $scope.openNotePopup();
    });
    $scope.$on("$destroy", popupHandler);

}]);