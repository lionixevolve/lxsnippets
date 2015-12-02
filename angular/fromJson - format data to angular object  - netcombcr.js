/*
 * Tomar datos y convertilo en un objecto de angular
 */

formatCrmData: function (result) {
    var crm_object = result.data.entry_list[0].name_value_list;
    var contact_sting = '{"data":[{';
    //ADD FILEDS WITH KEY AND VALUES
    for (var key in crm_object) {
        var attribute = '"' + key + '"' + ': "' + crm_object[key].value + '" ,';
        contact_sting += attribute;
    };
    if (result.data.relationship_list[0].link_list.length == 0) {
        contact_sting = contact_sting.substring(0, contact_sting.length - 1);
        contact_sting += "}]}";
        //*** CONVERTIR DATOS EN UN OBJETO DE ANGULAR ***
        var angular_obj = angular.fromJson(contact_sting);
        return angular_obj['data']['0'];
    } else {
        contact_sting += '"email_address": "' + result.data.relationship_list[0].link_list[0].records[0].link_value.email_address['value'] + '"';
        contact_sting += "}]}";
        //*** CONVERTIR DATOS EN UN OBJETO DE ANGULAR ***
        var angular_obj = angular.fromJson(contact_sting);
        return angular_obj['data']['0'];
    };
}