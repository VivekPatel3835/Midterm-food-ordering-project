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
$('.input-number.quantity').on('click', (e) => {
  e.stopPropagation();
})

$('.quantity-right-plus').click(function(e){
  e.stopPropagation();
  // Get the field name
  let quantity = parseInt($('.quantity').val());
  console.log($(this))
  $(this).closest('.quantity_counter').find('.input-number').val(quantity + 1);
});
$('.quantity-left-minus').click(function(e){
  e.stopPropagation();
  let quantity = parseInt($(this).closest('.quantity_counter').find('input').val());
  if(quantity > 0){
     $(this).closest('.quantity_counter').find('.input-number').val(quantity - 1);
  }
});

