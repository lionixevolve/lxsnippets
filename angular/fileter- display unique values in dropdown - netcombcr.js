/*
Filtro que devuelve valores únicos de un arreglo de objetos.
En la vista:
<md-input-container>
    <md-select md-container-class="calendar-color-select" ng-model="search.type" aria-label="Region">
        <md-option value=" ">All</md-option>
        <md-option ng-value="type" ng-repeat="type in vm.appt_types  | unique:'type' ">{{type}}</md-option>
    </md-select>
</md-input-container>
*/
app.filter('unique', function () {
    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }
        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {},
                newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }
            });
            items = newItems;
        }
        return items;
    };
});