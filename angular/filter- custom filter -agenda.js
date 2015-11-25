/*
Filtros custom para la fecha de la cita.
Filtro en la vista:
<h2><b>{{appoiment[0].date|mommentDateFormatFilter}} </b></h2>
<p>{{appoiment[0].appointment_id|dateHourFilter}}</p> 
*/

agendaApp.filter('mommentDateFormatFilter', function () {
    return function (appoimentDate) {
        if (appoimentDate != null) {
            return moment(appoimentDate, "YYYYMMDD,h:mm").fromNow();
        } else {
            return "";
        }
    }
});

agendaApp.filter('dateHourFilter', function ($filter) {
    return function (appoimentDate) {

        var dateArray = appoimentDate.split("-");
        //If month and date come without 0 before 
        if (dateArray[1].length < 2) {
            dateArray[1] = "0" + dateArray[1];
        }
        if (dateArray[2].length < 2) {
            dateArray[2] = "0" + dateArray[2];
        }

        //Format hour 1:00 PM
        var dateAndularFormat = dateArray[0] + "-" + dateArray[1] + "-" + dateArray[2] + "T" + dateArray[3] + ":" + dateArray[4] + ":00";
        var hour = dateArray[3] + ":" + dateArray[4];
        var hourFilter = $filter('date')(dateAndularFormat, 'h:mm a');

        return hourFilter;
    }
});

agendaApp.filter('customDateFormatFilter', function ($filter) {
    return function (appoimentDate) {
        if (typeof appoimentDate != 'undefined') {
            var dateArray = appoimentDate.split("-");

            //If month and date come without 0 before 
            if (dateArray[1].length < 2) {
                dateArray[1] = "0" + dateArray[1];
            }
            if (dateArray[2].length < 2) {
                dateArray[2] = "0" + dateArray[2];
            }

            //Format date 16 Sep 2015 
            var dateString = dateArray[0] + "/" + dateArray[1] + "/" + dateArray[2];
            var angularDate = new Date(dateString);
            var angularDateFilered = $filter('date')(angularDate, 'dd MMM yyyy');

            //Format hour 1:00 PM
            var dateAndularFormat = dateArray[0] + "-" + dateArray[1] + "-" + dateArray[2] + "T" + dateArray[3] + ":" + dateArray[4] + ":00";
            var hour = dateArray[3] + ":" + dateArray[4];
            var hourFilter = $filter('date')(dateAndularFormat, 'h:mm a');

            return angularDateFilered + "  " + hourFilter;

        } else {
            return "";
        }

    }
});