/*
Recorrer arreglo de objeto que vine del api y hacer mis objeto custom para el scope 
*/
vm.appoiments_assigned = [];
vm.getAppoimentsAssigned = function () {
        OpportunityService.getTranslatorAssignedOpportunitiesList().then(function (result) {
                //If no opportunities 
                if (result.data.opportunities == "empty set") {
                    vm.appoiments_assigned = [];
                    vm.assigned_msg = true;
                    vm.showProgressConfirmation = false;
                } else {
                    vm.assigned_msg = false;
                    //Iteract each opportunity
                    angular.forEach(result.data.opportunities, function (opportunity) {

                        //Get location time zone
                        var region_zone = vm.getRegionZone(opportunity.cstm.region_c);

                        //get time zone statart and end 
                        var time_zone_start = moment.tz(opportunity.cstm.appointmentstarttime_c, region_zone);
                        var time_zone_end = moment.tz(opportunity.cstm.appointmentendtime_c, region_zone);

                        //create opportunity object for table
                        var opportunity = {
                            id: opportunity.detail[0].id,
                            name: opportunity.detail[0].name,
                            region: opportunity.cstm.region_c,
                            region_name: opportunity.beautify.region_c,
                            interpreter: opportunity.beautify.Translator,
                            client: opportunity.beautify.client + " - " + opportunity.beautify.account,
                            status: opportunity.detail[0].sales_stage,
                            type: opportunity.detail[0].opportunity_type,
                            date: time_zone_start.format('MM/DD/YYYY'),
                            location: opportunity.cstm.locationname_c,
                            adress: opportunity.cstm.locationaddress_c,
                            location_phone: opportunity.cstm.locationphone_c,
                            notifications: opportunity.cstm.notifications_c,
                            starttime: vm.addZero(time_zone_start.hours()) + ":" + vm.addZero(time_zone_start.minutes()),
                            endtime: vm.addZero(time_zone_end.hours()) + ":" + vm.addZero(time_zone_end.minutes())
                        };
                        //Push appoiment
                        vm.appoiments_assigned.push(opportunity);
                    });
                    vm.showProgressConfirmation = false;
                }
            }).catch(function (result) {
                console.log("Error getting OpportunitiesList");
            });
};
vm.getAppoimentsAssigned();