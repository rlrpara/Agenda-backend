const connection = require('../Database/connection');
var bcrypt = require ('bcrypt');

var salt = bcrypt.genSaltSync(10);

module.exports = {
    async create(request, response) {
        let { email, senha } = request.body;

        senha = bcrypt.hashSync(senha, salt);

        let usuarios = await connection('usuarios')
            .where(x => x.email == email && x.senha == senha)
            .select('usuarioid', 'nome')
            .first();
        
        if(!usuarios) {
            return response.status(400).json({ error: 'Sem Usuários cadastrados com esse ID.' });
        }

        return response.json(usuarios);
    }
}