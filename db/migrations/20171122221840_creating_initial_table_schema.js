exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments().primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
    })
  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
