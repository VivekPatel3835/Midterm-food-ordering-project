$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

/* test ajax call to display the menus on the home page*/
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/menu_items"
  }).done((menu_items) => {
    for(item of menu_items) {
      console.log('in menu_items ajax call app.js')
      $("<div>").text(item.name + ' ' + item.description + ' ' + item.type + ' ' + item.price).appendTo($("body"));
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
