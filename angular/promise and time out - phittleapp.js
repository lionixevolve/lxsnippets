/*
 * Retornar una promesa hasta que se resuelva el get cookie de cookieMaster. Despues (then) que se resuelva la promesa recargar la página.
 */

//Servicio
getCookieMaster: function (cookieName) {
    return $q(function (resolve, reject) {
        setTimeout(function () {
            cookieMaster.getCookieValue($localStorage.domain, cookieName, function (data) {
                resolve(data.cookieValue);
            }, function (error) {
                if (error) {
                    reject('error: ' + error);
                }
            });
        }, 2000);
    });
}


//Controlador 
$scope.selectEnviroment = function () {
    $scope.data = {};
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.enviroment">',
        title: 'Change Enviroment',
        subTitle: 'Swicher',
        scope: $scope,
        buttons: [
            {
                text: 'Cancel'
                },
            {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function (e) {
                    if (!$scope.data.enviroment) {
                        //don't allow the user to close unless he enters wifi password
                        e.preventDefault();
                    } else {
                        return $scope.data.enviroment;
                    }
                }
                }
            ]
    });
    myPopup.then(function (enviroment) {
        enviroment = enviroment.toLowerCase();
        if (enviroment == 'dev' || enviroment == 'prod' || !isNaN(enviroment)) {
            $localStorage.current_enviroment = enviroment;
            CookieMaterService.setCookieMaster('SWITCHER', $localStorage.current_enviroment);
            //*** CUANDO LA PROMESA SE RESUELVA RECARGAR LA PÁGINA ***
            CookieMaterService.getCookieMaster('SWITCHER').then(function (data) {
                location.reload();
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'ERROR',
                template: 'Incorrect switcher value.'
            });
        }
    });
}