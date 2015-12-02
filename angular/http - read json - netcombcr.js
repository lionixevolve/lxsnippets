/*
Leer un archivo JSON con http 
services.json :
{
    "services": [
        {
            "name": "Banco",
            "value": "banco"
        },
        {
            "name": "BCR Pensiones",
            "value": "bcr_pensiones"
      },
        {
            "name": "BCR Corredora de Seguros",
            "value": "bcr_corredora_de_seguros"
      },
        {
            "name": "Otros",
            "value": "otros"
      }
   ]
}
*/

$scope.services = [];//Inicializar el arreglo de los servicios vacio
//Obtener los servicios del archivo json y actualizar el scope
$scope.getServicesList = function () {
    $http({
            method: 'GET',
            url: 'assets/js/data/services.json'
        }).then(function successCallback(response) {
            $scope.services = response.data.services;
        }, function errorCallback(response) {
            console.log("Error in getting services.");
    })
};