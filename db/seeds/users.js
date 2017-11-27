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
       knex('menu_items').insert([
        {price: 14, description: 'Tender tandoori tikkas simmered with creamy tomato sauce, an all-time favorite. (Medium Hot)', type: 'Starter',  name: 'pasta carbonara', restaurants_id: 1},
        {price: 6, description: 'mild', type: 'indian', name: 'vindaloo curry', restaurants_id: 2},
        {price: 18, description: 'disgusting', type: 'french', name: 'duck parfait', restaurants_id: 3},
        {price: 17, description: 'spicy', type: 'italian',  name: 'pasta carbonara', restaurants_id: 1},
        {price: 12, description: 'mild', type: 'indian', name: 'vindaloo curry', restaurants_id: 2},
        {price: 16, description: 'disgusting', type: 'french', name: 'duck parfait', restaurants_id: 3},
        {price: 14, description: 'spicy', type: 'italian',  name: 'pasta carbonara', restaurants_id: 1},
        {price: 14, description: 'mild', type: 'indian', name: 'vindaloo curry', restaurants_id: 2},
        {price: 5, description: 'disgusting', type: 'french', name: 'duck parfait', restaurants_id: 3},
        {price: 11, description: 'disgusting', type: 'french', name: 'duck parfait', restaurants_id: 3}
        ]
        )


       1    14  Starter 1 Butter Chicken
       2 A south Indian specialty, lentil-based, garnished with diced chicken & rice. (Medium Hot) 6 Starter 1 Mulligatawny Soup
       3 Chicken cubes in pickle seasoning, enough to tickle your plate. (Medium Hot)  18  Starter 1 Atish Kabab
       4 Large juice prawns marinated in spices & cooked to perfection in tandoor. (Mild)  17  Main  1 Tandoori Prawns
       5 Homemade cottage cheese cooked with green pepper, onion & tomato in rich gravy. (Medium Hot)  12  Main  1 Tawa Paneer Masala
       6 Whole fish (pomfret) marinated in traditional style & cooked over charcoal oven. (Medium Hot) 16  Main  1 Tandoori Machi
       7 Fish curry made with freshly ground coconut and array of masterfully blended spices. A specialty of Malabar West coast of India. (Medium Hot) 14  Main  1 Fish Malabari
       8 Beef pieces cooked with onion & yoghurt in flavor of saffron. (Medium Hot)  14  Main  1 Rogan Josh With Beef
       9 Soft bread stuffed with lightly spiced onion. 5 Side  1 Onion Kulcha
       10  Freshly cut okra lightly sauteed with onion and herbs. (Medium Hot) 11  Main  1 Okra Do Pyaza
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
