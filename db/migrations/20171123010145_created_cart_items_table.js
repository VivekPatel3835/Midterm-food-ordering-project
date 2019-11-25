exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('cart_items', function (table) {
      table.increments().primary();
      table.integer('quantity').notNullable();
      table.integer('menu_items_id').references('id').inTable('menu_items');
    })
  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable('cart_items')
  ])
};
