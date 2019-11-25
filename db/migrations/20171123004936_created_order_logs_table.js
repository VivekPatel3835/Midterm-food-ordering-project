exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('order_logs', function (table) {
      table.increments().primary();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.string('special_message');
      table.integer('order_phone_number').notNullable();
      table.string('status').defaultTo('cart'); /* status can be cart, not delivered or delivered*/
      table.integer('user_id').references('id').inTable('users');
    })
  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable('order_logs')
  ])
};
