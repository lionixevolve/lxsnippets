/*
 Servicio injectandolo a angular.
*/

(function () {
    'use strict';

    angular
        .module('app.sierra.ContactService', [])
        .factory('ContactService', ContactService);

    /* @ngInject */
    function ContactService($http, API_CONFIG, localStorageService) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + localStorageService.get('token');

        return {
            createContact: function (contact) {
                return $http.post(API_CONFIG.url + 'api/v1/contacts', contact);
            },
            updateContact: function (contact) {
                return $http.put(API_CONFIG.url + 'api/v1/contacts', contact);
            },
            getRegionsList: function () {
                return $http.get(API_CONFIG.url + 'api/v1/contacts/lists/regions');
            },
            getStatusList: function () {
                return $http.get(API_CONFIG.url + 'api/v1/contacts/lists/status');
            },
            getWorkFlexibilitiesList: function () {
                return $http.get(API_CONFIG.url + 'api/v1/contacts/lists/workflexibilities');
            },
            getContactStaffList: function () {
                return $http.get(API_CONFIG.url + 'api/v1/contacts/types/staffs');
            },
            getContactClientfList: function () {
                return $http.get(API_CONFIG.url + 'api/v1/contacts/types/clients');
            },
            getContactTranslatotfList: function () {
                return $http.get(API_CONFIG.url + 'api/v1/contacts/types/translators');
            },
            translatorResetPassword: function (contact) {
                return $http.put(API_CONFIG.url + 'api/v1/opportunities/current/translator/reset/password', contact);
            },
            forgotPassword: function (email) {
                return $http.get(API_CONFIG.url + 'api/v1/send/mail/forgotpassword/to/' + email);
            }
        }
    };

})();