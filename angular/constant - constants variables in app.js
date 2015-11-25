/*
 * Varibles constantes en la app
*/

var sierraApp = angular
    angular
        .module('app', [
            'triangular',
             'ngCookies', 'ngMessages', 'ngMaterial',
            'ui.router', 'pascalprecht.translate', 'LocalStorageModule', 'ui.calendar', 'textAngular', 'app.sierra', 'app.sierra.AuthenticationService', 'app.sierra.UserService', 'app.sierra.ContactService', 'app.sierra.AccountService', 'app.sierra.OpportunityService', 'webix', 'ui.select', 'ngFileUpload'
        ])
        // set a constant for the API we are connecting to
        .constant('API_CONFIG', {
            'url': 'http://sierrainterpreting.vcap.me/',
            'url_crm': 'http://sierrainterpreting.vcap.me/crm/',
            'translatorModules': ["MENU.DASHBOARD.DASHBOARD", "MENU.ASSIGNED.ASSIGNED", "MENU.UPCOMING.UPCOMING", "MENU.PENDING.PENDING", "MENU.COMPLETED.COMPLETED", "MENU.PROFILE.PROFILE"],
            'staffModules': ["MENU.SCHEDULE.SCHEDULE", "MENU.REPORTS.REPORTS", "MENU.INTERPRETERS.INTERPRETERS", "MENU.STAFF.STAFF", "MENU.CLIENTS.CLIENTS"]
        })

