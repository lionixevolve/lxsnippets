/*
 El select2 simple en la vista: 
<ui-select ng-model="vm.schedule.interpreter" ng-disabled="disabled" style="min-width: 280px; " ng-change="vm.displayTranslatorInfo()">
        <ui-select-match>{{$select.selected.name}}</ui-select-match>
            <ui-select-choices repeat="interpreter in vm.interpreters | propsFilter: {name: $select.search, certification: $select.search}">
                <div ng-bind-html="interpreter.name | highlight: $select.search"></div>
                <small> Certification#: <span ng-bind-html="''+interpreter.certification | highlight: $select.search"></span></small>
            </ui-select-choices>
</ui-select>
*/

//Array vacio
vm.interpreters = [];
//Obtener la lista de interpreters del api
ContactService.getContactTranslatotfList().then(function (result) {
    angular.forEach(result.data.contacts, function (data) {
        //validate interpreter certification
        if (!data.cstm.interpretercertification_c) {
            data.cstm.interpretercertification_c = "no_data";
        }
        //Preparar el objeto del interpreter 
        var interpreter = {
            name: data.detail[0].first_name + " " + data.detail[0].last_name,
            id: data.detail[0].id,
            phone: data.detail[0].phone_mobile,
            email: data.detail.email_address,
            certification: data.cstm.interpretercertification_c,
            region: data.cstm.region_c,
            workflexibility: data.cstm.workflexibility_c
        };
        //Agregar el interpreter a la lista
        vm.interpreters.push(interpreter);
    });
    var no_translator_index = vm.interpreters.length - 1;
    //Seleccionar el último objeto de la lista como el seleccionado por defecto en el select 2
    vm.schedule.interpreter = vm.interpreters[no_translator_index];
}).catch(function (result) {
    console.log("Error getting TranslatotfList in oportunity form");
});