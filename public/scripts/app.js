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



// Stripe

var checkoutHandler = StripeCheckout.configure({
  key: "pk_test_j9hetKgNQ7lkQbWZZqJ2WYuU",
  locale: "auto"
});

var button = document.getElementById("buttonCheckout");
button.addEventListener("click", function(ev) {
  checkoutHandler.open({
    name: "food ordering",
    description: "Purchase order",
    token: handleToken
  });
});

function handleToken(token) {
  fetch("/charge", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(token)
})
.then(response => {
  if (!response.ok)
    throw response;
  return response.json();
})
.then(output => {
  console.log("Purchase succeeded:", output);
})
.catch(err => {
  console.log("Purchase failed:", err);
})
}

