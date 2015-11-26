/*
Desplegar mensajes con toast.
*/

//Toast
vm.showToast = function showToast(message) {
    $mdToast.show({
        template: message,
        position: 'top right',
        hideDelay: 4000
    });
};

//Accept appoiment
vm.acceptAppoiment = function (appoiment) {
    vm.showProgressConfirmation = true;
    var api_object = {
        "opportunity": {
            "id": appoiment.id
        }
    };
    OpportunityService.acceptOpportunity(api_object).then(function (result) {
        //Toast message 
        var msn = "Appointment " + appoiment.region_name + " - " + appoiment.date + " accepted successfully.";
        vm.showToast('<md-toast style="background-color:#009933;"><span flex> <md-icon md-font-icon="fa fa-check" style="color:white; font-size:12px;">' + msn + '</md-icon></span></md-toast>');
        vm.appoiments_assigned = [];
        vm.getAppoimentsAssigned();
        vm.getConfirmedAppoiments();
    }).catch(function (result) {
        //Toast message 
        var msn = "ERROR: accepting appointment " + appoiment.region_name + " - " + appoiment.date;
        vm.showToast('<md-toast style="background-color:#CC0000;"><span flex> <md-icon md-font-icon="fa fa-times" style="color:white; font-size:12px;">' + msn + '</md-icon></span></md-toast>');
    });
};