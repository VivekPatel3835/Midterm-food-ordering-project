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
        {price: 14, description: 'Tender tandoori tikkas simmered with creamy tomato sauce, an all-time favorite. (Medium Hot)', type: 'Starter',  name: 'Butter Chicken', restaurants_id: 1},
        {price: 6, description: 'A south Indian specialty, lentil-based, garnished with diced chicken & rice. (Medium Hot)', type: 'Starter', name: 'Mulligatawny Soup', restaurants_id: 2},
        {price: 18, description: 'Large juice prawns marinated in spices & cooked to perfection in tandoor. (Mild)', type: 'Main', name: 'Tandoori Prawns', restaurants_id: 3},
        {price: 17, description: 'Homemade cottage cheese cooked with green pepper, onion & tomato in rich gravy. (Medium Hot)', type: 'Main',  name: 'Tawa Paneer Masala', restaurants_id: 1},
        {price: 12, description: 'Whole fish (pomfret) marinated in traditional style & cooked over charcoal oven. (Medium Hot)', type: 'Main', name: 'Tandoori Machi', restaurants_id: 2},
        {price: 16, description: 'Fish curry made with freshly ground coconut and array of masterfully blended spices. A specialty of Malabar West coast of India. (Medium Hot)', type: 'Main', name: 'Fish Malabari', restaurants_id: 3},
        {price: 14, description: 'Beef pieces cooked with onion & yoghurt in flavor of saffron. (Medium Hot)', type: 'Main',  name: 'Rogan Josh With Beef', restaurants_id: 1},
        {price: 14, description: 'Soft bread stuffed with lightly spiced onion.', type: 'Side', name: 'Onion Kulcha', restaurants_id: 2},
        {price: 5, description: 'Chicken cubes in pickle seasoning, enough to tickle your plate. (Medium Hot)', type: 'Main', name: 'Atish Kabab', restaurants_id: 3},
        {price: 11, description: 'Freshly cut okra lightly sauteed with onion and herbs. (Medium Hot)', type: 'Main', name: 'Okra Do Pyaza', restaurants_id: 3}
        ]
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
