exports.seed = function(knex, Promise) {
  return knex('users', 'restaurants', 'menu_items', 'cart_items', 'order_logs')
    .then(function () {
      return Promise.all([

        /*  run first - users table seed & restaurants table seed*/

        // knex('users').insert({name: 'Alice', email: 'john@doe.com', password: 'password'}),
        // knex('users').insert({name: 'Tony', email: 'john@doe.com', password: 'password'}),
        // knex('users').insert({name: 'Arvind', email: 'john@doe.com', password: 'password'}),

        // knex('restaurants').insert({name: 'Mcdonalds', phone_number: '519-111-1111', address: 'rankin', food_type: 'italian'}),
        // knex('restaurants').insert({name: 'Dominos', phone_number: '519-111-1111', address: 'rankin', food_type: 'italian'}),
        // knex('restaurants').insert({name: 'pizza hut', phone_number: '519-111-1111', address: 'rankin', food_type: 'italian'})

        /* run second - menu items table seed */
        // knex('menu_items').insert({price: 23, description: 'spicy', type: 'italian', restaurants_id: 1}),
        // knex('menu_items').insert({price: 35, description: 'mild', type: 'indian', restaurants_id: 2}),
        // knex('menu_items').insert({price: 46, description: 'disgusting', type: 'french', restaurants_id: 3})

        /* run third - order logs table seed*/

        // knex('order_logs').insert({special_message: 'please ring bell', order_phone_number: 5191111111, status: 'cart', user_id: 1}),
        // knex('order_logs').insert({special_message: 'please knock on door', order_phone_number: 5191154544, status: 'not delivered', user_id: 2}),
        // knex('order_logs').insert({special_message: 'please shout', order_phone_number: 5191110989, status: 'delivered', user_id: 3})

        /* run fourth - cart items table seed*/

        // knex('cart_items').insert({quantity: 23, menu_items_id: 1}),
        // knex('cart_items').insert({quantity: 35, menu_items_id: 2}),
        // knex('cart_items').insert({quantity: 46, menu_items_id: 3})

        /*run fifth - add foreign key in order_id for cart_items_id, then add foreign key in cart_items for order_id - */

      ]);
    });
};
