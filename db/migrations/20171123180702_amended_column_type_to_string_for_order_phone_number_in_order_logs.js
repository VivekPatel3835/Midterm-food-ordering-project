exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('order_logs', function(table){
      table.dropColumn('order_phone_number');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('order_logs', function(table){
      table.integer('order_phone_number').notNullable();
    })
  ])
};
