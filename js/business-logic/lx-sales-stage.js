// This file containts opportunities bussines logic
function getLxSalesStageDropdown(currentValue,opportunityType)
{
    var method = "getLxSalesStageList";
    var data = "method="+method;
    opportunityType = (opportunityType==null || opportunityType=='') ? 'goods' : opportunityType;
    currentValue = (currentValue==null || currentValue=='') ? 'prospecto' : currentValue;

    if ( $("input#lxOpportunityType").length ) {
        currentValue = ( opportunityType == $("input#lxOpportunityType").val() ) ? $("input#lxCurrentValue").val() : 'prospecto';
    }
    data += "&currentValue="+currentValue;
    data += "&opportunityType="+opportunityType;
    //data += "&use_adodb5="+"1";
    $.ajax({
        // beforeSend is a pre-request callback function that can be used to modify the jqXHR.
        beforeSend: function(jqXHR,settings){
            console.log("*** start ***");
            console.log("beforeSend callback:",settings.url);
        }, //end beforeSend
        url: 'lxajax.php',
        type: 'GET',
        data: data,
        // success is a function to be called if the request succeeds.
        success: function(data,status,jqXHR){
            $('#sales_stage').fillSelect($.parseJSON(data));
        }, // end success
        // error is a function to be called if the request fails.
        error: function(jqXHR,status,error){
            console.log("Function getLxSalesStageDropdown",status,":",error);
        }, // end error
        // complete is a function to be called when the request finishes (after success and error callbacks are executed).
        complete: function(jqXHR,status){
            // Store currentValue and opportunityType to reload when selected back
            var $lxCurrentValue = $('input#lxCurrentValue').length ? $('input#lxCurrentValue') : $('<input/>',{type:'hidden',id:'lxCurrentValue',value:currentValue});
            $lxCurrentValue.appendTo('body');
            var $lxOpportunityType = $('input#lxOpportunityType').length ? $('input#lxOpportunityType') : $('<input/>',{type:'hidden',id:'lxOpportunityType',value:opportunityType});
            $lxOpportunityType.appendTo('body');
            console.log("complete callback:","lxCurrentValue:",$lxCurrentValue.val(),"lxOpportunityType:",$lxOpportunityType.val());
            console.log("*** finish ***");;
        }, // end complete
        datatype : "text"
    }); // end ajax
}// end function
var crmEditView = document.forms['EditView'];
if (crmEditView) {
    console.log("Loading Lionix code on EditView on module:",crmEditView.module.value);
    if ( crmEditView.module.value=='Opportunities' ) {
        getLxSalesStageDropdown($("#sales_stage").val(),$("#opportunity_type").val()); //popoulate dropdown once when editview loads.
        $('#opportunity_type').click(function() {
            getLxSalesStageDropdown($("#sales_stage").val(),$("#opportunity_type").val()); //popoulate dropdown once when editview loads.
        });
    }
}
//eof