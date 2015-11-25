/* 
Inyectar el servicio PatietService a agendaApp
*/
'use strict';
agendaApp.factory('PatietService', function ($http, $localStorage) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.token;
    return {
        createPatient: function (pacient) {
            return $http.post($localStorage.domain + 'api/v1/contacts', pacient);
        },
        getPatient: function (patientId) {
            return $http.get($localStorage.domain + 'api/v1/contacts/' + patientId);
        },
        updatePatient: function (patientId, new_patient_data) {
            return $http.put($localStorage.domain + 'api/v1/contacts/' + patientId, new_patient_data);
        },
        getPatientList: function () {
            return $http.get($localStorage.domain + 'api/v1/contacts/patients/for/account/' + $localStorage.account_id);
        },
        getPatientAppoimentsList: function (patientId) {
            return $http.get($localStorage.domain + 'api/v1/appointments/detail/for/account/' + $localStorage.account_id + '/patient/' + patientId);
        }

    }
});