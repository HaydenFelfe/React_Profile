$(function () {
  var currentTime = dayjs().hour();

  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var description = localStorage.getItem(timeBlockId);

    if (description !== null) {
      $(this).children(".description").val(description);
    }
  });
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    var description = $(this).siblings(".description").val();

    localStorage.setItem(timeBlockId, description);
  });
  $(".time-block").each(function () {
    var hour = parseInt($(this).attr("id").split("-")[1]);

    if (hour < currentTime) {
      $(this).addClass("past");
    } else if (hour === currentTime) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
});