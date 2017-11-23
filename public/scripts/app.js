$(() => {
  $.ajax({
    method: "GET",
    url: "/api/restaurants"
  }).done((restaurants) => {
    for(restaurant of restaurants) {
      $("<div>").text(restaurant.address + ' - ' + restaurant.phone_number + ' - ' + restaurant.name + ' - ' + restaurant.food_type ).appendTo($("body"));
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
