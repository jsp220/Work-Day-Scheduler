// declare and define variables to be used in the script
var currentDayEl = $('#current-day');

// ready function executes after the DOM has been loaded
$(document).ready(function () {
    // clear button clears schedule on page as well as localstorage
    $(".clearBtn").on("click", function () {
        $(".time-block").each(function() {
            $(this).children("textarea").val("");
        });
        localStorage.clear();
    });
    
    $(".saveBtn").on("click", function () {
        // find the value of the sibling tag containing the class .description and assign to eventDesc
        var eventDesc = $(this).siblings(".description").val(); 
        // assigns the id of the parent tag to variable hour as a string
        var hour = JSON.stringify($(this).parent().attr("id"));
        
        localStorage.setItem(hour, eventDesc); // save hour and eventDesc as key-value pair in localStorage

        $(".notif").removeClass("d-none"); // make the notification text visible on page
        
        // clear notification after 5 seconds
        var timer = setInterval(function() {
            $(".notif").addClass("d-none");

            clearInterval(timer);
        }, 5000);

    });

    // recall events saved on localStorage
    function recallSchedule () {
        // everywhere the class time-block appears, populate the child textarea tag with the value from the key matching the id
        $(".time-block").each(function() {
            $(this).children("textarea").val(localStorage.getItem(JSON.stringify($(this).attr("id"))));
        });
    };

    // displays today's date to tag containing id current-day
    function displayDay() {
        var today = moment().format('dddd, MMMM Do, YYYY');
        $("#current-day").text(today);
    };
   
    // colors the textareas on the calendar according to current time
    function currentTime() {
        var currentMilTime = moment().format("HH00"); // get current hour in military format (disregarding minutes)

        // everywhere the class time-block appears, check the id and compare against the current military time
        // set colors based on if the time block is before, on, or after the current hour
        $(".time-block").each(function() {
            var blockHour = parseInt($(this).attr("id"));

            if (blockHour > currentMilTime) {
                $(this).addClass("future");
            } else if (blockHour == currentMilTime) {
                $(this).removeClass("future");
                $(this).addClass("present");
            } else {
                $(this).removeClass("future");
                $(this).removeClass("present");
                $(this).addClass("past");
            }
        })
    };

    // execute all functions
    recallSchedule();
    displayDay();
    currentTime();

    // update calendar coloring every minute
    setInterval(currentTime, 60000);

});
