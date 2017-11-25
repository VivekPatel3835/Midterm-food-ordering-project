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


// Quantity counter



$('.quantity-right-plus').click(function(e){
  e.preventDefault();
  // Get the field name
  var quantity = parseInt($('.quantity').val());

  $('.quantity').val(quantity + 1);

});

$('.quantity-left-minus').click(function(e){
  e.preventDefault();
  var quantity = parseInt($('.quantity').val());
  if(quantity>0){
     $('.quantity').val(quantity - 1);
  }
});

