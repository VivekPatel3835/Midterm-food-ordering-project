exports.seed = function (knex) {
  return knex('users', 'restaurants', 'menu_items', 'order_logs', 'cart_items')
    .then(async function () {

      // delete any existing seed data
      await knex('cart_items').del();
      await knex('order_logs').del();
      await knex('menu_items').del();
      await knex('restaurants').del();
      await knex('users').del();

      // re-seed all data
      const users = await knex('users')
        .insert(
          [{name: 'Tagawa', email: 'john@doe.com', password: 'password'}
            , {name: 'Pinky', email: 'john@doe.com', password: 'password'}
            , {name: 'Targy', email: 'john@doe.com', password: 'password'}]
        ).returning("*");

      const restaurants = await knex('restaurants').insert([{
          name: 'Mcdonalds',
          phone_number: '519-111-1111',
          address: 'rankin',
          food_type: 'italian'
        },
          {name: 'Dominos', phone_number: '519-111-1111', address: 'rankin', food_type: 'italian'},
          {name: 'pizza hut', phone_number: '519-111-1111', address: 'rankin', food_type: 'italian'}]
      ).returning("*");

      const menuItems = await knex('menu_items').insert([
          {
            price: 14,
            description: 'Tender tandoori tikkas simmered with creamy tomato sauce, an all-time favorite. (Medium Hot)',
            type: 'Starter',
            name: 'Butter Chicken',
            restaurants_id: restaurants[0].id
          },
          {
            price: 6,
            description: 'A south Indian specialty, lentil-based, garnished with diced chicken & rice. (Medium Hot)',
            type: 'Starter',
            name: 'Mulligatawny Soup',
            restaurants_id: restaurants[1].id
          },
          {
            price: 18,
            description: 'Large juice prawns marinated in spices & cooked to perfection in tandoor. (Mild)',
            type: 'Main',
            name: 'Tandoori Prawns',
            restaurants_id: restaurants[2].id
          },
          {
            price: 17,
            description: 'Homemade cottage cheese cooked with green pepper, onion & tomato in rich gravy. (Medium Hot)',
            type: 'Main',
            name: 'Tawa Paneer Masala',
            restaurants_id: restaurants[0].id
          },
          {
            price: 12,
            description: 'Whole fish (pomfret) marinated in traditional style & cooked over charcoal oven. (Medium Hot)',
            type: 'Main',
            name: 'Tandoori Machi',
            restaurants_id: restaurants[1].id
          },
          {
            price: 16,
            description: 'Fish curry made with freshly ground coconut and array of masterfully blended spices. A specialty of Malabar West coast of India. (Medium Hot)',
            type: 'Main',
            name: 'Fish Malabari',
            restaurants_id: restaurants[2].id
          },
          {
            price: 14,
            description: 'Beef pieces cooked with onion & yoghurt in flavor of saffron. (Medium Hot)',
            type: 'Main',
            name: 'Rogan Josh With Beef',
            restaurants_id: restaurants[0].id
          },
          {
            price: 14,
            description: 'Soft bread stuffed with lightly spiced onion.',
            type: 'Side',
            name: 'Onion Kulcha',
            restaurants_id: restaurants[1].id
          },
          {
            price: 5,
            description: 'Chicken cubes in pickle seasoning, enough to tickle your plate. (Medium Hot)',
            type: 'Main',
            name: 'Atish Kabab',
            restaurants_id: restaurants[2].id
          },
          {
            price: 11,
            description: 'Freshly cut okra lightly sauteed with onion and herbs. (Medium Hot)',
            type: 'Main',
            name: 'Okra Do Pyaza',
            restaurants_id: restaurants[2].id
          }
        ]
      ).returning("*");

      const orderLogs = await knex('order_logs').insert([
        {special_message: 'please ring bell', order_phone_number: 5191111111, status: 'cart', user_id: users[0].id},
        {
          special_message: 'please knock on door',
          order_phone_number: 5191154544,
          status: 'not delivered',
          user_id: users[1].id
        },
        {special_message: 'please shout', order_phone_number: 5191110989, status: 'delivered', user_id: users[2].id}]
      ).returning("*");
      //
      // const cartItems = await knex('cart_items').insert([
      //   {quantity: 23, menu_items_id: menuItems[0].id, order_id: orderLogs[0].id},
      //   {quantity: 35, menu_items_id: menuItems[1].id, order_id: orderLogs[1].id},
      //   {quantity: 46, menu_items_id: menuItems[2].id, order_id: orderLogs[2].id}]
      // );
    });
};
