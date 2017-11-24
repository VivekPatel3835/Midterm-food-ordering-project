$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("main"));
    }
    // assign the users to the object  to make it accessible to the header functions on insert new user.
    usersObject = users;
  });;
});

// Slider query

$('#bootstrap-touch-slider').bsTouchSlider();

//Homepage counter query

 $('.statistic-counter_two, .statistic-counter, .count-number').counterUp({
    delay: 10,
    time: 2000
  });
