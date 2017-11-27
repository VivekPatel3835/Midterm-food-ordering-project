
const printCartItems = (cart) => {
  let html = ''
  let totalPrice = 0
  cart.forEach((item) => {
    const itemId = item.id
    html += `
    <div class="col-md-12 inner_div" style="border-bottom:1px solid rgba(255,255,255,.4); padding: 25px !important">
    <h4>${item.name}</h4>
    <p>${item.description}</p>
    <h5>$ ${item.price}</h5>
    <span class="checkout_quantity">Quantity:${item.quantity}</span>
    </div>`
    totalPrice += (item.price * item.quantity)
  })
  $('.checkout_bar .row.checkout_order').html(html);
  $('.total_checkout').html(`Total:$ ${totalPrice}`)
}

$.ajax({
  method: "GET",
  url: "/cart_items",
  success: (cart) => {
    printCartItems(cart)
  },
  error: (error) => {
    res.error(error)
  }
});


$('body').on('click', '#shop', function(event) {
  event.stopPropagation()
  let phoneNumber = $(this).parents('#checkoutForm').find('#checkoutPhoneNumber').find('input').val()
  let specialInstructions = $(this).parents('#checkoutForm').find('#checkoutInstructions').find('textarea').val()

  const data = {'special_message': specialInstructions,
  'status': 'not delivered', 'order_phone_number': phoneNumber}
  console.log('in ajax post request for updating checkout instructions')
  // if menu item exists dont add - wrap everything in an if statement
  $.ajax({
    method: "POST",
    data: data,
    url: "/checkout",
    success: (result) => {
      console.log(result)
    },
    error: (error) => {
      console.log('ajax post - add item to cart not working')
    },
    complete: () => {
      console.log('post /cart-items Ajax call complete. Does not mean that it was successfull')
    }
  });
})




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

