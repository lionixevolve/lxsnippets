/*
 * Observar la lista de citas de los pacientes y si hay una nueva actualizar el calendario
 */

$scope.$watch(
        function () {
            return $localStorage.events;
        },
        function (data) {
            var today = new Date();
            var month = today.getMonth() + 1;
            var year = today.getFullYear();
            AppoimentService.getAppoimentsByMonthYear(month, year).then(function (result) {
                if (result.data.appointments == "empty set") {
                    $scope.events = [];
                } else {
                    $scope.events = result.data.appointments;
                }
            });
        },
        true
);