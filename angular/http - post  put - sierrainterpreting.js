/*
 * http: Crear una oportunidad o actualizar una exitente
 */

//Servicio
(function () {
    'use strict';

    angular
        .module('app.sierra.OpportunityService', [])
        .factory('OpportunityService', OpportunityService);

    /* @ngInject */
    function OpportunityService($http, API_CONFIG, localStorageService) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + localStorageService.get('token');

        return {
            createOpportunity: function (opportunity) {
                return $http.post(API_CONFIG.url + 'api/v1/opportunities', opportunity);
            },
            updateOpportunity: function (opportunity) {
                return $http.put(API_CONFIG.url + 'api/v1/opportunities', opportunity);
            }
        }
    };

})();


//En el contolador
vm.createScheduler = function () {
    //show progress bar 
    vm.showProgress = true;
    //Validate form fields
    var save_appoiment = true;
    var msn = "";
    //Validate cliente selected
    if (vm.schedule.client.id == 0) {
        save_appoiment = false;
        msn = "ERROR: You have to select a Client/Claimant Name."
    };
    //Validate date 
    var today = $filter('date')(new Date(), 'yyyy-MM-dd');
    var appoiment_date = $filter('date')(vm.schedule.date, 'yyyy-MM-dd');
    var valid_date = moment(appoiment_date).isAfter(today);
    if (!valid_date) {
        save_appoiment = false;
        msn = "ERROR: Invalid Date."
    };
    //Save appoiment
    if (save_appoiment) {
        console.log(vm.translatorTypesSelected);
        //Opportunity region zone
        var region_zone = vm.getRegionZone(vm.schedule.region.value);

        //Appoiment start time with date
        var appointmentstarttime = moment.tz($filter('date')(vm.schedule.date, 'yyyy-MM-dd') + "T" + vm.schedule.hour_start + ":" + vm.schedule.minute_start + ":00", region_zone);
        //Appoiment end time with date
        var appointmentendtime = moment.tz($filter('date')(vm.schedule.date, 'yyyy-MM-dd') + "T" + vm.schedule.hour_end + ":" + vm.schedule.minute_end + ":00", region_zone);
        //api scheduler object
        var apiObject = {
            "opportunity": {
                "accountId": vm.schedule.client.account_id,
                "dateClosed": appointmentstarttime.tz('UTC').format('YYYY-MM-DD'),
                "translatorId": vm.schedule.interpreter.id,
                "clientId": vm.schedule.client.id,
                "opportunityType": vm.schedule.appt_type.value,
                "salesStage": vm.schedule.stage.value,
                "regionC": vm.schedule.region.value,
                "appointmentstarttimeC": vm.addZero(appointmentstarttime.tz('UTC').hours()) + ":" + vm.addZero(appointmentstarttime.tz('UTC').minutes()),
                "appointmentendtimeC": vm.addZero(appointmentendtime.tz('UTC').hours()) + ":" + vm.addZero(appointmentendtime.tz('UTC').minutes()),
                "locationnameC": vm.schedule.location,
                "locationaddressC": vm.schedule.address,
                "locationphoneC": vm.schedule.location_phone,
                "notificationsC": vm.schedule.notifications,
                "notificationsbyemailC": vm.getNotificationValue(vm.schedule.notifications_email),
                "notificationsbysmsC": vm.getNotificationValue(vm.schedule.notifications_sms),
                "notificationsbyemail24hC": vm.getNotificationValue(vm.schedule.email_24hour),
                "notificationsbyemailmorningC": vm.getNotificationValue(vm.schedule.email_morning),
                "notificationsbyemail2hC": vm.getNotificationValue(vm.schedule.email_2hour),
                "notificationsbysms24hC": vm.getNotificationValue(vm.schedule.text_24hour),
                "notificationsbysmsmorningC": vm.getNotificationValue(vm.schedule.text_morning),
                "notificationsbysms2hC": vm.getNotificationValue(vm.schedule.text_2hour)
            }
        };

        //Create oportunity 
        OpportunityService.createOpportunity(apiObject).then(function (result) {
            //hide progress bar
            vm.showProgress = false;
            //Toast message
            msn = "Appointment created!";
            vm.showToast('<md-toast style="background-color:#009933;"><span flex> <md-icon md-font-icon="fa fa-check" style="color:white; font-size:12px;">' + msn + '</md-icon></span></md-toast>');
            //Reset form
            vm.resetForm();

        }).catch(function (result) {
            //Hide progress bar
            vm.showProgress = false;
            //Toast message 
            msn = "ERROR: Saving Appointment. Try Again.";
            vm.showToast('<md-toast style="background-color:#CC0000;"><span flex> <md-icon md-font-icon="fa fa-times" style="color:white; font-size:12px;">' + msn + '</md-icon></span></md-toast>');
        });


    } else { // Invalid form
        //hide progress bar 
        vm.showProgress = false;
        //Toast message
        vm.showToast('<md-toast style="background-color:#CC0000;"><span flex> <md-icon md-font-icon="fa fa-times" style="color:white; font-size:12px;">' + msn + '</md-icon></span></md-toast>');
    };
};
}