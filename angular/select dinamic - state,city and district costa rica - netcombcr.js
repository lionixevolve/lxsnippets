/*
 * Cargar dropdown dinamicos cantón distrito y provincia 
 * En la vista 
 <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>
                                Dirección física
                            </label>
                            <div class="input-group">
                                <div class="input-group-addon">
                                    <i class="fa fa-map-marker"></i>
                                </div>
                                <input type="text" ng-model="contact.crmaddress_c" class="form-control" value="" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>
                                        Provincia
                                    </label>
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-map-marker"></i>
                                        </div>
                                        <select ng-model="contact.crmstate_c" name="crmstate_c" ng-options="state as state.name for state in states track by state.idstate" ng-change="getCities()">
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>
                                        Cantón
                                    </label>
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-map-marker"></i>
                                        </div>
                                        <select ng-model="contact.crmcity_c" name="crmcity_c" ng-options="city as city.name for city in cities track by city.idcity" ng-change="getDistricts()">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>
                                        Distrito
                                    </label>
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-map-marker"></i>
                                        </div>
                                        <select name="crmdistrict_c" ng-model="contact.crmdistrict_c" ng-options="district as district.name for district in districts track by district.iddistrict">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
</div>
*/

// *** EN EL SERVICIO ***
getlxGetStates: function () {
    var params = {
        session: $localStorage.userSession
    };
    var json = JSON.stringify(params);
    var dataToPost = {
        method: "lxGetStates",
        input_type: "JSON",
        response_type: "JSON",
        rest_data: json
    };
    var request = $http({
        method: "POST",
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        data: dataToPost
    });
    request.success(
        function (html) {
            if (!!html) {
                if (typeof html != 'undefined' && typeof html.number != 'undefined' && html.number == "11") {
                    //SessionID Expired
                    console.log('Error Provided by Server' + JSON.stringify(html));
                }
                if (typeof html != 'undefined' && typeof html == 'string' && html.length > 1) {}
            } else {
                console.log("Null data returned from the API");
            }
        });
    request.error(
        function (html) {
            console.log(html);
            return (false);
        }
    );
    return request;

}

getlxGetCities: function (idstate) {
    var params = {
        session: $localStorage.userSession,
        idstate: idstate
    };
    var json = JSON.stringify(params);
    var dataToPost = {
        method: "lxGetCities",
        input_type: "JSON",
        response_type: "JSON",
        rest_data: json
    };
    var request = $http({
        method: "POST",
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        data: dataToPost
    });
    request.success(
        function (html) {
            if (!!html) {
                if (typeof html != 'undefined' && typeof html.number != 'undefined' && html.number == "11") {
                    //SessionID Expired
                    console.log('Error Provided by Server' + JSON.stringify(html));
                }
                if (typeof html != 'undefined' && typeof html == 'string' && html.length > 1) {}
            } else {
                console.log("Null data returned from the API");
            }
        });
    request.error(
        function (html) {
            console.log(html);
            return (false);
        }
    );
    return request;

}

getlxGetDistricts: function (idstate, idcity) {
    var params = {
        session: $localStorage.userSession,
        idstate: idstate,
        idcity: idcity
    };
    var json = JSON.stringify(params);
    var dataToPost = {
        method: "lxGetDistricts",
        input_type: "JSON",
        response_type: "JSON",
        rest_data: json
    };
    var request = $http({
        method: "POST",
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        data: dataToPost
    });
    request.success(
        function (html) {
            if (!!html) {
                if (typeof html != 'undefined' && typeof html.number != 'undefined' && html.number == "11") {
                    //SessionID Expired
                    console.log('Error Provided by Server' + JSON.stringify(html));
                }
                if (typeof html != 'undefined' && typeof html == 'string' && html.length > 1) {}
            } else {
                console.log("Null data returned from the API");
            }
        });
    request.error(
        function (html) {
            console.log(html);
            return (false);
        }
    );
    return request;

}

// *** EN EL CONTROLADOR ***
//GET STATES 
$scope.getStates = function () {
    crmService.getlxGetStates().then(function (result) {
        $scope.states = angular.fromJson(result.data);
    });
};
$scope.getStates();

//GET CITIES ON CHANGE STATES 
$scope.getCities = function () {
    crmService.getlxGetCities($scope.contact.crmstate_c.idstate).then(function (result) {
        $scope.cities = angular.fromJson(result.data);
    });
}

//GET DISTRICT ON CHANGE STATE 
$scope.getDistricts = function () {
    crmService.getlxGetDistricts($scope.contact.crmstate_c.idstate, $scope.contact.crmcity_c.idcity).then(function (result) {
        $scope.districts = angular.fromJson(result.data);
    });
}

//SEARCH CONTACT BY ID
$scope.current_call_selected = {};
$scope.showSpinner = false;
$scope.searchContact = function (searchForm) {
    if (searchForm.$valid) {
        $scope.showSpinner = true;
        crmService.getContactByCedula($scope.contact.cedula_c).then(function (result) {
            if (result.data.result_count == 0) {
                $scope.showSpinner = false;
                $scope.displayToasterMessage('info', 'Buscar por Cédula', "No se encontro nadie con el número de cédula " + $scope.contact.cedula_c);
                $scope.contact = {};
            } else {
                if (result.data.relationship_list[0].link_list.length == 0) {
                    $scope.contact_email = "";
                } else {
                    $scope.contact_email = result.data.relationship_list[0].link_list[0].records[0].link_value.email_address['value'];
                }

                var contact_data = crmService.formatCrmData(result);
                if (!contact_data.crmstate_c) {
                    contact_data.crmstate_c = "00";
                }
                var state_index = getIndexOf($scope.states, contact_data.crmstate_c, "idstate");

                crmService.getlxGetCities(contact_data.crmstate_c).then(function (result) {
                    $scope.cities = angular.fromJson(result.data);
                    if (!contact_data.crmcity_c) {
                        contact_data.crmcity_c = "00";
                    }
                    var city_index = getIndexOf($scope.cities, contact_data.crmcity_c, "idcity");

                    crmService.getlxGetDistricts(contact_data.crmstate_c, contact_data.crmcity_c).then(function (result) {
                        $scope.districts = angular.fromJson(result.data);
                        if (!contact_data.crmdistrict_c) {
                            contact_data.crmdistrict_c = "000";
                        }
                        var district_index = getIndexOf($scope.districts, contact_data.crmdistrict_c, "iddistrict");

                        $scope.contact = {
                            "id": contact_data.id,
                            "first_name": contact_data.first_name,
                            "last_name": contact_data.last_name,
                            "lastname2_c": contact_data.lastname2_c,
                            "phone_home": contact_data.phone_home,
                            "phone_mobile": contact_data.phone_mobile,
                            "phone_work": contact_data.phone_work,
                            "crmaddress_c": contact_data.crmaddress_c,
                            "crmcity_c": $scope.cities[city_index],
                            "crmstate_c": $scope.states[state_index],
                            "crmdistrict_c": $scope.districts[district_index],
                            "jjwg_maps_address_c": contact_data.jjwg_maps_address_c,
                            "birthdate": contact_data.birthdate,
                            "date_entered": contact_data.date_entered,
                            "date_modified": contact_data.date_modified,
                            "assigned_user_id": contact_data.assigned_user_id,
                            "modified_user_id": contact_data.modified_user_id,
                            "phonebank1_c": contact_data.phonebank1_c,
                            "phonebank2_c": contact_data.phonebank2_c,
                            "phonebank3_c": contact_data.phonebank3_c,
                            "phonebank4_c": contact_data.phonebank4_c,
                            "phonebank5_c": contact_data.phonebank5_c,
                            "phonebank6_c": contact_data.phonebank6_c,
                            "cedula_c": contact_data.cedula_c,
                            "alien_c": contact_data.alien_c,
                            "email_address": $scope.contact_email
                        };

                        //Set ALIEN
                        if ($scope.contact.alien_c == 1) {
                            $scope.contact.alien_c = true;
                        } else {
                            $scope.contact.alien_c = false;
                        }

                        $scope.showSpinner = false;

                        //Load Contact call history in webix
                        $scope.loadContactHistory();

                    });

                });

            }
        });
    }
};

// *** EN EL BACKEND ***
/*
    function lxGetStates($session){//Get states list
        global $current_user,$db;
        $query="
                SELECT
                    ifnull(a.name,'---') as name,
                    ifnull(a.idstate,-1) as idstate
                FROM lxstate a where a.iso2='CR'
        ";
        $result = $db->query($query, true, 'FAILD' );
        $r=array();
            while(($row= $db->fetchByAssoc($result))){
                $r[]=$row;
            }
        
        header('Content-Type: application/json');
        return json_encode($r);
    }//end Get states list
    
    
    function lxGetCities($session, $idstate){//Get city list
        global $current_user,$db;
        $query="
                SELECT
                    ifnull(name,'---') as name,
                    ifnull(idcity,'---') as idcity
                FROM lxcity
                WHERE idstate='{$idstate}'
                AND iso2='CR'
        ";
        $result = $db->query($query, true, 'FAILD' );
        $r=array();
            while(($row= $db->fetchByAssoc($result))){
                $r[]=$row;
            }
        
        header('Content-Type: application/json');
        return json_encode($r);
    }//end Get city list
    
    
    function lxGetDistricts($session, $idstate, $idcity){//Get district list
        global $current_user,$db;
        $query="
                SELECT ifnull(name,'---') as name,
                        ifnull(iddistrict,'---') as iddistrict
                FROM lxdistrict
                WHERE idstate='{$idstate}' 
                AND idcity='{$idcity}'
                AND iso2='CR'
        ";
        $result = $db->query($query, true, 'FAILD' );
        $r=array();
            while(($row= $db->fetchByAssoc($result))){
                $r[]=$row;
            }
        header('Content-Type: application/json');
        return json_encode($r);
    }//end Get district list 
 */