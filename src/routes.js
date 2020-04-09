const express = require('express');
const UsuarioController = require('./Controllers/UsuarioController');
const ClienteController = require('./Controllers/ClienteController');
const AgendaController = require('./Controllers/AgendaController');
const SessionController = require('./Controllers/SessionController');

const routes = express.Router();
// USUARIOS E LOGIN
routes.get('/usuario', UsuarioController.index);
routes.get('/usuario/:id', UsuarioController.apensaum);
routes.put('/usuario', UsuarioController.update);
routes.post('/usuario', UsuarioController.create);
routes.delete('/usuario/:id', UsuarioController.delete);

// CLIENTES
routes.get('/cliente', ClienteController.index);
routes.post('/cliente', ClienteController.create);
routes.put('/cliente/:id', ClienteController.update);

// AGENDA
routes.get('/agenda', AgendaController.index);
routes.post('/agenda', AgendaController.create);
routes.delete('/agenda/:id', AgendaController.delete);

// LOGIN
routes.post('/sessions', SessionController.create)

module.exports = routes;