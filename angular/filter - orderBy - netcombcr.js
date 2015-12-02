/*
    Ordenar alfabeticamente una arreglo de objeto por un atributo
*/
$scope.service_options_n1 = [];
$scope.getOptionsN1 = function () {
        $http({
            method: 'GET',
            url: 'assets/js/data/service_options_n1.json'
        }).then(function successCallback(response) {
            $scope.service_options_n1 = response.data.service_options_n1;
            //***ORDENAR ALFABETICAMENTE LOS OBJETOS POR NOMBRE***
            $scope.service_options_n1_ordered = $filter('orderBy')($scope.service_options_n1, "name", false);
        }, function errorCallback(response) {
            console.log("Error in getting services n1 options.");
        });
};