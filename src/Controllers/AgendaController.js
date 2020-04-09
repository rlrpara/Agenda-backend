const connection = require('../Database/connection');

module.exports = {
    async index(request, response) {
        let UsuarioId = request.headers.authorization;
        let { page = 1 } = request.query;
        let [ count ] = await connection('agenda')
            .where(x => x.CodUsuario == UsuarioId)  
            .count();

        let agenda = await connection('agenda')
            .where(x => x.CodUsuario == UsuarioId)  
            .join('usuarios', 'usuarios.usuarioid', '=', 'agenda.CodUsuario')
            .join('cliente', 'cliente.clienteid', '=', 'agenda.CodCliente')
            .limit(5)
            .offset( (page - 1) * 5 )
            .select([ 'agenda.*',
                'usuarios.nome as Usuario'   ,
                'usuarios.email'             ,
                'cliente.nome as Cliente'    ,
                'cliente.CodTotvs as TotvsId',
                'cliente.ContatoNome'     ,
                'cliente.ContatoEmail'    ]);
        
        response.header('total-registros', count['count(*)']);
    
        return response.json(agenda);
    },

    async create(request, response) {
        let { titulo, data, descricao, horainicio,
            horafim, informado, codcliente } = request.body;

        let codusuario = request.headers.authorization;

        console.log( codcliente );

        let [ AgendaId ] = await connection('agenda').insert({
            titulo    , data         ,
            descricao , horainicio,
            horafim, informado    ,
            codcliente, codusuario
        });

        return response
                .json({ AgendaId });
    },

    async delete(request, response) {
        let { id } = request.params;
        console.log(id);
        let usuarioId = request.headers.authorization;

        let agenda = await connection('agenda')
            .where('AgendaId', id)
            .select('CodUsuario')
            .first();

        if(agenda.CodUsuario != usuarioId) {
            return response
                    .status(401)
                    .json({ error : "Operação não permitida" });
        }

        await connection('agenda')
                .where('AgendaId', id).delete();

        return response
                .status(204).send(`Requisição recebida com sucesso! ${id}`);
    }
};