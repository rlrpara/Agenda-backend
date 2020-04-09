
exports.up = function(knex) {
    return knex.schema.createTable('agenda', function (table) {
        table.increments('AgendaId').primary();

        table.string('titulo', 200).notNullable();
        table.datetime('data', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.text('descricao').notNullable();
        table.time('horainicio', { precision: 6 }).notNullable();
        table.time('horafim', { precision: 6 }).notNullable();
        table.boolean('informado').notNullable();


        table.integer('CodCliente').notNullable();
        table.integer('CodUsuario').notNullable();

        // table.foreign('CodUsuario').references('UsuarioId').inTable('Usuarios');
        // table.foreign('CodCliente').references('ClienteId').inTable('Cliente');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('agenda');
};
