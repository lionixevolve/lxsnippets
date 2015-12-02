/*
Pasar parámetros por url
*/

//Poner parámetros en la url de la configuración del router
$urlRouterProvider.otherwise("/app/home//");
$stateProvider.state('app', {
                url: "/app",
                templateUrl: "assets/views/app.html",
                resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl'),
                abstract: true
            }).state('app.home', {
                url: '/home/:contactId/:callId',
                templateUrl: "assets/views/home.html",
                title: 'Inicio',
                ncyBreadcrumb: {
                    label: 'Inicio'
                };
            })
});


//Cuando se selecciona una fila en webix se envian los parámetros contactId y callId a la vista del home
pendingDatatable.attachEvent("onItemClick", function (id) {
    var call = this.getItem(id);
    $state.go('app.home', {
                        'contactId': call.contact_id,
                        'callId': call.id_c
    });
});

//Inyectar stateParams en el controlador donde queremos obtener los valores de los parámetros de la URL
app.controller('HomeCtrl', ["$scope", "crmService", "$localStorage", "CRM_REST_CONFIG", "$stateParams", "toaster", "$filter", "$http", "$rootScope", function ($scope, crmService, $localStorage, CRM_REST_CONFIG, $stateParams, toaster, $filter, $http, $rootScope) {
    //Get contact id and call id from url
    $scope.call_id = $stateParams.callId;
    $scope.contact_id = $stateParams.contactId;
});

