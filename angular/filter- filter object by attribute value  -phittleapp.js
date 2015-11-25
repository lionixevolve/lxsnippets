/*
 Traer la lista de categorias del usuario y filtrar aquellas que concuerdan y encender los toggle
    El toggle en la vista:
    <ion-toggle ng-repeat="item in categories" ng-model="item.checked" ng-change="updateCategory(item);">
        {{ item.name }}
    </ion-toggle>
 */

 //Lista de categorias 
$scope.categories = [
        {
            name: "Inform me",
            checked: false
        },
        {
            name: "Challenge me",
            checked: false
        },
        {
            name: "Inspire me",
            checked: false
        },
        {
            name: "Explain to me",
            checked: false
        },
        {
            name: "Surprise me",
            checked: false
        },
        {
            name: "Warn me",
            checked: false
        },
        {
            name: "Empower me",
            checked: false
        },
        {
            name: "Amuse me",
            checked: false
        },
        {
            name: "Espanol me",
            checked: false
        }
  ];

//Obtner las categorias del usuario del api
CategoriesService.getUserCategories()
        .then(function (categories) {
            if (categories.data.user_tag.tags != "empty set") {
                var user_categories = angular.fromJson(categories.data.user_tag.tags);
                angular.forEach(user_categories, function (user_category) {
                    
                    //***** FILTRAR LAS CATEGORIAS POR EL ATRIBUTO NOMBRE *****
                    var category_found = $filter('filter')($scope.categories, {
                        name: user_category.name
                    }, true);
                    
                    //Si la categoria se encuentra encender el toggle
                    if (category_found.length) {
                        var index_category = getIndexOf($scope.categories, user_category.name, "name");
                        $scope.categories[index_category].checked = true;
                    }
                });
            }
});