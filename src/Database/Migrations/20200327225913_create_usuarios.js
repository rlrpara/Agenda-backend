
exports.up = function(knex) {
    return knex.schema.createTable('Usuarios', function (table) {
        table.increments('UsuarioId').primary();
        table.string('nome', 200).notNullable();
        table.string('email', 50).notNullable();
        table.string('senha', 200).notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Usuarios');
};
