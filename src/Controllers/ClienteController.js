const connection = require('../Database/connection');

module.exports = {
    async index(request, response) {
        let cliente = await connection('cliente')
        .select('*');
    
        return response.json(cliente);
    },

    async create(request, response) {
        let { nome         , CodTotvs    ,
              ContatoNome  , ContatoEmail,
              DadosRemoto  , TotvsId     ,
              TokenMigracao } = request.body;
    
    
        let [ ClienteId ] = await connection('cliente').insert({
            nome         , CodTotvs    ,
            ContatoNome  , ContatoEmail,
            DadosRemoto  , TotvsId     ,
            TokenMigracao
        });
    
        return response.json({ ClienteId });
    },

    async update(request, response) {
        let { id } = request.params;

        let { nome         , CodTotvs       ,
              ContatoNome  , ContatoEmail   ,
              DadosRemoto  , TotvsId        ,
              TokenMigracao } = request.body;
    
    
        let [ ClienteId ] = await connection('cliente').update({
            nome         , CodTotvs    ,
            ContatoNome  , ContatoEmail,
            DadosRemoto  , TotvsId     ,
            TokenMigracao
        }).where('ClienteId', id);
    
        return response.json({ ClienteId });
    },
};