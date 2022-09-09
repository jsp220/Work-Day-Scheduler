var currentDayEl = $('#current-day');

$(document).ready(function () {
    $(".saveBtn").on("click", function () {
        // assigns the value of the sibling tag containing the class .description to variable eventDesc
        var eventDesc = $(this).siblings(".description").val(); 
        // assigns the id of the parent tag to variable hour
        var hour = $(this).parent().attr("id");
        
        localStorage.setItem(hour, eventDesc);

        $(".notif").removeClass("d-none");
    });

    function displayDay() {
        var today = moment().format('dddd, MMMM Do, YYYY');
        $("#current-day").text(today);
    }
   
    function currentTime() {
        var currentMilTime = moment().subtract(12, "hour").format("HH00");

        $(".time-block").each(function() {
            var blockHour = parseInt($(this).attr("id"));

            if (blockHour < currentMilTime) {
                $(this).addClass("past");
            } else if (blockHour == currentMilTime) {
                $(this).removeClass("past");
                $(this).addClass("present");
            } else {
                $(this).removeClass("present");
                $(this).removeClass("past");
                $(this).addClass("future");
            }
        })
    }

    displayDay();

    currentTime();

    setInterval(currentTime, 60000);

    // recallSchedule();


});
