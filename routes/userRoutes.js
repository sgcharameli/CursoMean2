'use strict';

var express = require('express');
var userController = require('../controllers/userController');

var apiRestUser = express.Router();

apiRestUser.get('/probando-controlador', userController.pruebas);
apiRestUser.post('/register', userController.saveUser);

module.exports = apiRestUser;
