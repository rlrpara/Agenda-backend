
exports.up = function(knex) {
    return knex.schema.createTable('Cliente', function (table) {
        table.increments('ClienteId').primary();

        table.string('nome', 200).notNullable();
        table.string('CodTotvs', 10);
        table.string('ContatoNome', 100);
        table.string('ContatoEmail', 50);
        table.string('DadosRemoto', 800);
        table.string('TotvsId', 50);
        table.string('TokenMigracao', 100);

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('Cliente');
};
