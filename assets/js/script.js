function displayDay() {
    var today = moment().format('dddd, MMM DD, YYYY');
    $("#current-day").text(today);
}

displayDay();