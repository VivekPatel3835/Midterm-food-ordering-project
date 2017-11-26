const printCartItems = () => {
   // once you figure out how to maintian the same order id for the customer in the menu_items page,
   //    come here and complete the get request to populate the cart-items sidebox
          $.ajax({
        method: "GET",
        url: "/menu_items",
        success: () => {
          console.log('in get /cart_items ajax request after creating the order log - now it should populate the carts box')
        },
        error: (error) => {
          console.log('in get /cart_items ajax request - ajax call not working')
        },
        complete: () => {
          console.log(' get /cart_items Ajax call complete. Does not mean that it was successfull')
        }
      });
      console.log('in post /cart_items/cart ajax request')
}

$('body').on('click', '.menu_item', function() {
  const data = {'special_message': 'not yet entered', 'status': 'cart-test', 'order_phone_number': 'not yet entered', 'menu_item_id': 1}
  console.log('in cart.js ajax file - the item has been clicked ')
    $.ajax({
    method: "POST",
    data: data,
    url: "/cart_items",
    success: () => {
      printCartItems();
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

