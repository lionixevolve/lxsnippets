// https://developer.mozilla.org/en/docs/Web/API/MutationObserver
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        console.log(mutation.type);
        if (mutation.type == "attributes") {
            console.log(mutation.target);
            console.log(mutation.target.nodeName);
            if (mutation.target.nodeName=="FORM") {
                //when found do your code
                console.log("I found a FORM");
                    //other example could be use jQuery to alter a select dropdown
                    // This snippet works on SuiteCRM adding lx-sales-stage.js located on business-logic folder
//                 getLxSalesStageDropdown($("#sales_stage").val(),$("#opportunity_type").val()); //popoulate dropdown once when editview loads.
//                 $('#opportunity_type').click(function() {
//                     getLxSalesStageDropdown($("#sales_stage").val(),$("#opportunity_type").val()); //popoulate dropdown once when editview loads.
//                 });
                // later, you can stop observing
                observer.disconnect();
            }
        }
    });
});
// Observer target
var target = document.querySelector('#content');
// configuration of the observer:
// NOTE: At the very least, childList, attributes, or characterData must be set to true. Otherwise, "An invalid or illegal string was specified" error is thrown.
var config = {attributes: true, childList: true, characterData: true, subtree: true };
 // pass in the target node, as well as the observer options
observer.observe(target, config);
//eof