$((users) => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
    }
  });;
});

// Slider query
$('#bootstrap-touch-slider').bsTouchSlider();

//Homepage counter query

 $('.statistic-counter_two, .statistic-counter, .count-number').counterUp({
    delay: 10,
    time: 2000
  });


//Sticky header

var navbar = $(".navbar");
    stickyDiv = "sticky";

$(window).scroll(function() {
  if( $(this).scrollTop()) {
    navbar.addClass(stickyDiv);
  } else {
    navbar.removeClass(stickyDiv);
  }
});
