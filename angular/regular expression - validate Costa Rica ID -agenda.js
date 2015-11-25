/*
 * Expresion regular para validar la cédula en Costa Rica 
 */
$scope.validateCedula = function (cedula) {
        var expresion = /^[1-9]{1}\d{8}$/;
        if ((cedula != '') && (cedula.match(expresion))) {
            return true;
        } else {
            return false;
        }
};