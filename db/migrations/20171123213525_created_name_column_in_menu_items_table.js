exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('menu_items', function(table){
      table.string('name').notNullable().defaultTo('default_name');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('menu_items', function(table){
      table.dropColumn('name');
    })
  ])
};
