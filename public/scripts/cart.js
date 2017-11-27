const printCartItems = (cart) => {
  // console.log('cart in printCartItems function-->', cart)
  let html = ''
  let totalPrice = 0
  cart.forEach((item) => {
    const itemId = item.id
    html += `<div class="row checkout_row">
    <span class='itemInCart' style='display:none'>${item.id}</span>
    <div class="col-md-12 inner_div">
    <h4>${item.name}</h4>
    <div class="edit_buttons">
    <button class='deleteCartItems' onclick='deleteCartItem(${itemId})'>Delete</button>
    </div>
    <h5>$ ${item.price}</h5>
    <span class="quantity">Quantity: ${item.quantity}</span>
    </div>
    </div>
    <!--   <div class="quantity_counter">
    <span class="plus_button">
    <button type="button" class="quantity-left-minus btn btn-number"  data-type="minus" data-field="">
    <span class="glyphicon glyphicon-minus"></span>
    </button>
    </span>
    <input type="text" name="quantity" class="form-control input-number quantity" value='<%= item.quantity%>' min="1" max="100"/>
    <span class="minus_button">
    <button type="button" class="quantity-right-plus btn btn-number" data-type="plus" data-field="">
    <span class="glyphicon glyphicon-plus"></span>
    </button>
    </span>
    </div> -->`
    totalPrice += (item.price * item.quantity)
})
  $('#cartItemsContainer').html(html);
  $('#totalPrice').html(`Total:$ ${totalPrice}`)
}


$(() => {
  $.ajax({
    method: "GET",
    url: "/cart_items",
    success: (cart) => {
      console.log('in initial get /cart_items ajax request for menu_page load'
        + 'created the order log - now it should populate the carts box')

      printCartItems(cart)
  },
  error: (error) => {
      console.log('in get /cart_items ajax request - ajax call not working')
  },
  complete: () => {
      console.log(' get /cart_items Ajax call complete. Does not mean that it was successfull')
  }
});
})

const getCartItems = () => {
 $.ajax({
  method: "GET",
  url: "/cart_items",
  success: (cart) => {
    console.log('in get /cart_items ajax request after '
      + 'creating the order log - now it should populate the carts box')
    printCartItems(cart)
},
error: (error) => {
    console.log('in get /cart_items ajax request - ajax call not working')
},
complete: () => {
    console.log(' get /cart_items Ajax call complete. Does not mean that it was successfull')
}
});
}

$('.menu_item').on('click', function(event) {
    event.stopPropagation()
    event.stopImmediatePropagation()
    const itemNumber = $(this).find('.menu_item_id').html();
    const orderQuantity = $(this).find('.input-number').val();
    const data = {'special_message': 'not yet entered',
    'status': 'cart-test', 'order_phone_number': 'not yet entered',
    'menuItemId': itemNumber, 'orderQuantity': orderQuantity}
    console.log('in cart.js ajax file - the item has been clicked. order quantity --> ', orderQuantity, ' menu item # --> ', itemNumber)
  // if menu item exists dont add - wrap everything in an if statement
  $.ajax({
    method: "POST",
    data: data,
    url: "/cart_items",
    success: () => {
      getCartItems();
  },
  error: (error) => {
      console.log('ajax post - add item to cart not working')
  },
  complete: () => {
      console.log('post /cart-items Ajax call complete. Does not mean that it was successfull')
  }
});
})


const deleteCartItem = (cartItemNumber) => {
    console.log(cartItemNumber)
  event.preventDefault()
  const data = {'cart_item_id' : cartItemNumber}
  $.ajax({
    method: "DELETE",
    data: data,
    url: "/cart_items",
    success: (result) => {
        getCartItems();
        console.log('post delete cart item ajax call was successful', result)
    },
    error: (error) => {
      console.log('ajax post - delete item from cart not working', error)
  },
  complete: () => {
      console.log('post /cart-items Ajax call complete. Does not mean that it was successfull')
  }
});

}

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

