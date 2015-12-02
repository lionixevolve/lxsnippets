/*
Ponerle las estrellas a la carta seleccionada.
Las estrellitas en la vista:
<div class="stars">
        <div ng-if="card.rating > 0">
            <ul class='rating2' ng-class='{readonly: readonly}'>
                <li ng-repeat="i in getStars(card.rating) track by $index"> <i class='icon ion-star'> </i> </li>
            </ul>
        </div>
</div>
*/

//OBTENER EL INDEX DE LA CARTA DEL SCOPE A LA QUE LE HICE RATING POR EL ID
var card_index = getIndexOf($scope.cards, current_card.id, "id");
if (!$scope.cards[card_index].rated) {
    //BEGIN START POPUP
    var confirmPopup = $ionicPopup.confirm({
        title: 'Do you like it? Rate with stars',
        template: '<div ng-controller="RatingCtrl" class="container"> <star-rating ng-model="rating" max=5 on-rating-selected="rateFunction(rating)"></star-rating> <div></div></div>'
    });
    //When START POPUP CLOSE
    confirmPopup.then(function (res) {
        if (res) {
            //PONERLE LAS ESTRELLITAS A ESA CARTA DEL SCOPE 
            $scope.cards[card_index].rating = ArticlesService.articleRating;
            $scope.cards[card_index].rated = true;
        }
    });
}
};

//Funcion para obtener el index 
function getIndexOf(arr, val, prop) {
    var l = arr.length,
        k = 0;
    for (k = 0; k < l; k = k + 1) {
        if (arr[k][prop] === val) {
            return k;
        }
    }
    return false;
}