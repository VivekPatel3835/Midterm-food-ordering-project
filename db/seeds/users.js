exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice', email: 'john@doe.com', 'password'}),
        knex('users').insert({id: 1, name: 'Tony', email: 'john@doe.com', 'password'}),
        knex('users').insert({id: 1, name: 'Arvind', email: 'john@doe.com', 'password'}),

        knex('restaurants').insert({id: 1, name: 'Mcdonalds', email: 'john@doe.com', 'password'}),
        knex('restaurants').insert({id: 1, name: 'Dominos', email: 'john@doe.com', 'password'}),
        knex('restaurants').insert({id: 1, name: 'Arvind', email: 'john@doe.com', 'password'}),

              knex('users').insert({id: 1, name: 'Alice', email: 'john@doe.com', 'password'}),
        knex('users').insert({id: 1, name: 'Tony', email: 'john@doe.com', 'password'}),
        knex('users').insert({id: 1, name: 'Arvind', email: 'john@doe.com', 'password'}),

              knex('users').insert({id: 1, name: 'Alice', email: 'john@doe.com', 'password'}),
        knex('users').insert({id: 1, name: 'Tony', email: 'john@doe.com', 'password'}),
        knex('users').insert({id: 1, name: 'Arvind', email: 'john@doe.com', 'password'})
      ]);
    });
};
