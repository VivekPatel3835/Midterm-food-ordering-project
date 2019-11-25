exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('menu_items', function (table) {
      table.increments().primary();
      table.string('description').notNullable();
      table.integer('price').notNullable();
      table.string('type').notNullable();
      table.integer('restaurants_id').references('id').inTable('restaurants');
    })
  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable('menu_items')
  ])
};
