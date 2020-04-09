var bcrypt = require ('bcrypt');

const connection = require('../Database/connection');

var salt = bcrypt.genSaltSync(10);

module.exports = {
    async index(request, response) {
        let usuarios = await connection('usuarios').select('*');
    
        return response.json(usuarios);
    },

    async apensaum(request, response) {
        let { id } = request.params;

        let usuarios = await connection('usuarios')
            .where('UsuarioId', id)
            .select('*');
    
        return response.json(usuarios);
    },

    async create(request, response) {
        let { nome, email, senha } = request.body;
    
        senha = bcrypt.hashSync(senha, salt); //criptografa a senha
    
        let [ UsuarioId ] =  await connection('usuarios').insert({
            nome, email, senha
        });

        return response.json({ UsuarioId });
    },

    async update(request, response) {
        let { nome, email, senha } = request.body;
    
        senha = bcrypt.hashSync(senha, salt); //criptografa a senha
    
        let [ UsuarioId ] =  await connection('usuarios').update({
            nome, email, senha
        });

        return response.json({ UsuarioId });
    },

    async delete(request, response) {
        let { id } = request.params;
        // let usuarioId = request.headers.authorization;

        // let usuario = await connection('usuarios')
        //     .where('UsuarioId', id)
        //     .select('CodUsuario')
        //     .first();

        // if(agenda.CodUsuario != usuarioId) {
        //     return response
        //             .status(401)
        //             .json({ error : "Operação não permitida" });
        // }

        await connection('usuarios')
                .where('UsuarioId', id).delete();

        return response
                .status(204).send(`Usuário removido com sucesso! ${id}`);
    }
};