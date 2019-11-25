exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('restaurants', function (table) {
      table.increments().primary();
      table.string('address').notNullable();
      table.string('phone_number').notNullable();
      table.string('name').notNullable();
      table.string('food_type').notNullable();
    })
  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable('restaurants')
  ])
};
