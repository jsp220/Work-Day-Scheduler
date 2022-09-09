var currentDayEl = $('#current-day');
var hourElId = [];
$(".time-block").each(function() {
    hourElId.push($(this).attr("id"));
});

console.log(hourElId);

$(document).ready(function () {
    $(".saveBtn").on("click", function () {
        // assigns the value of the sibling tag containing the class .description to variable eventDesc
        var eventDesc = $(this).siblings(".description").val(); 
        // assigns the id of the parent tag to variable hour
        var hour = JSON.stringify($(this).parent().attr("id"));
        
        localStorage.setItem(hour, eventDesc);

        $(".notif").removeClass("d-none");
        
        var timer = setInterval(function() {
            $(".notif").addClass("d-none");

            clearInterval(timer);
        }, 5000);

    });

    function displayDay() {
        var today = moment().format('dddd, MMMM Do, YYYY');
        $("#current-day").text(today);
    };
   
    function currentTime() {
        var currentMilTime = moment().add(13, "hour").format("HH00");

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
    };

    function recallSchedule () {
        $(".time-block").each(function() {
            $(this).children("textarea").val(localStorage.getItem(JSON.stringify($(this).attr("id"))));
            console.log($(this).attr("id"));
        });

    };

    displayDay();

    currentTime();

    setInterval(currentTime, 60000);

    recallSchedule();


});
