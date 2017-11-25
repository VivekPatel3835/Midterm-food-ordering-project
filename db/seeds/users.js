exports.seed = function(knex, Promise) {
  return knex('users', 'restaurants', 'menu_items', 'cart_items', 'order_logs')
    .then(function () {
      return Promise.all([


        knex('users')
        .insert(
          [{name: 'Tagawa', email: 'john@doe.com', password: 'password'}
          ,{name: 'Pinky', email: 'john@doe.com', password: 'password'}
          ,{name: 'Targy', email: 'john@doe.com', password: 'password'}]
          )
        .returning('*')
        .then((result) => {
                    knex('restaurants').insert([{name: 'Mcdonalds', phone_number: '519-111-1111', address: 'rankin', food_type: 'italian'},
            {name: 'Dominos', phone_number: '519-111-1111', address: 'rankin', food_type: 'italian'},
            {name: 'pizza hut', phone_number: '519-111-1111', address: 'rankin', food_type: 'italian'}]
              )
            }
          )
        .then((result) => {
             knex('menu_items').insert([{price: 23, description: 'spicy', type: 'italian',  name: 'pasta carbonara', restaurants_id: 1},
            {price: 35, description: 'mild', type: 'indian', name: 'vindaloo curry', restaurants_id: 2},
            {price: 46, description: 'disgusting', type: 'french', name: 'duck parfait', restaurants_id: 3}]
            )
          }
        )
        .then((result) => {
             knex('order_logs').insert([{special_message: 'please ring bell', order_phone_number: 5191111111, status: 'cart', user_id: 1},
            {special_message: 'please knock on door', order_phone_number: 5191154544, status: 'not delivered', user_id: 2},
            {special_message: 'please shout', order_phone_number: 5191110989, status: 'delivered', user_id: 3}]
              )
            }
          )
          .then((result) => {
            knex('cart_items').insert([{quantity: 23, menu_items_id: 1, order_logs: 1},
              {quantity: 35, menu_items_id: 2, order_logs: 2},
              {quantity: 46, menu_items_id: 3, order_logs: 3}]
              )
             }
          )
          .catch((err) => {
            console.log('error in seeding --> ', err)
          })
      ]);
    });
};
