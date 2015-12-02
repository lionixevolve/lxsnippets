/*
El multi select en la vista:
<ui-select multiple ng-model="vm.translatorTypesSelected" theme="select2" ng-disabled="disabled" style="width: 500px;">
        <ui-select-match placeholder="Select appt type...">{{$item.name}}</ui-select-match>
            <ui-select-choices repeat="type.value as type in vm.translatorTypes | propsFilter: {name: $select.search}">
            <div ng-bind-html="type.name | highlight: $select.search"></div>
        </ui-select-choices>
</ui-select>
<p>Selected: {{vm.translatorTypesSelected}}</p>
 */

//Valores del multiselect
vm.translatorTypes = [
        {
            name: "General ones",
            value: "general"
        },
        {
            name: "Legal Certified",
            value: "legal"
        },
        {
            name: "Medical Certified",
            value: "medical"
        }
];
//El objeto seleccionado del multiselect
vm.translatorTypesSelected = [];