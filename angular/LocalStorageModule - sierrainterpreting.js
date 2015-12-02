/*
  localStorageService.set('localStorageKey','Add this!');
  var value = localStorageService.get('localStorageKey');
  localStorageService.remove('localStorageKey');
  localStorageService.clearAll();
  localStorageService.cookie.set('localStorageKey','I am a cookie value now');
*/

function LoginController($state, triSettings, $http, API_CONFIG, localStorageService, AuthenticationService, UserService, triMenu, OpportunityService) {
        var vm = this;

        //Login function
        vm.loginClick = function loginClick() {
            vm.error_msn = false;
            vm.showProgress = true;

            //Get token
            AuthenticationService.getToken(vm.user.username, vm.user.password).then(function (response) {
                    //set token to header
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    //save token in local storage variable
                    localStorageService.set('token', response.data.token);
                    //get user info
                    AuthenticationService.validateToken().then(function (response) {
                            //Get user info
                            UserService.getUser().then(function (response) {

                                //Full Name in local storage
                                localStorageService.set('full_name', response.data.whoami.contact[0].first_name + " " + response.data.whoami.contact[0].last_name);
                                localStorageService.set('fosuser_type', response.data.whoami.contact.fosuser_type);

                                //Photo in local stotrage
                                if (response.data.whoami.contact[0].photo == null || response.data.whoami.contact[0].photo == "") {
                                    localStorageService.set('photo', "assets/images/Icon-user.png");
                                } else {
                                    localStorageService.set('photo', response.data.whoami.contact[0].photo);
                                };

                                //If user login is a STAFF send to staff console
                                if (response.data.whoami.contact.fosuser_type == "staff") {
                                    OpportunityService.getRegionsList().then(function (result) {
                                        localStorageService.set('regions_list', result.data.region_list);
                                        menuCustomizer('staff');
                                        vm.showProgress = false;
                                        $state.go('triangular.admin-default.schedule'); //staff user console default page
                                    }).catch(function (result) {
                                        vm.showProgress = false;
                                        console.log("Error getting RegionsList in oportunity form");
                                    });
                                };
                                //If user login is a TRANSLATOR send to trasnslator console
                                if (response.data.whoami.contact.fosuser_type == "translator") {
                                    //get regions list from api
                                    OpportunityService.getRegionsList().then(function (result) {
                                        localStorageService.set('regions_list', result.data.region_list);
                                        menuCustomizer('translator');
                                        vm.showProgress = false;
                                        $state.go('triangular.admin-default.dashboard'); //translator
                                    }).catch(function (result) {
                                        vm.showProgress = false;
                                        console.log("Error getting RegionsList in oportunity form");
                                    });

                                };
                            }).catch(function (response) {
                                vm.showProgress = false;
                                console.log("ERROR");
                                //display error message true
                                vm.error_msn = true;
                            });
                        })
                        .catch(function (response) {
                            console.log("ERROR");
                            vm.showProgress = false;
                            //display error message true
                            vm.error_msn = true;
                        });
                })
                .catch(function (response) {
                    vm.showProgress = false;
                    console.log("ERROR");
                    //display error message true
                    vm.error_msn = true;
                });
        };
    }