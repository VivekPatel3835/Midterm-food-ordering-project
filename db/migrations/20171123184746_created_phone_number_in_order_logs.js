exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('order_logs', function(table){
      table.string('order_phone_number').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('order_logs', function(table){
      table.dropColumn('order_phone_number');
    })
  ])
};
