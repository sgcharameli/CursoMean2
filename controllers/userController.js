'use strict';

var bcrypt = require('bcrypt-nodejs');
var userModel = require('../models/user');

function pruebas(request, response){
    response.status(200).send({message: 'Probando el controlador de usuario'});
}

function saveUser(request, response){
    var user = new userModel();
    
    var body = request.body;
    user.name = body.name;
    user.surname = body.surname;
    user.email = body.email;
    user.role = 'ROLE_USER';
    user.image = 'null';
    
    if (body.password){
        bcrypt.hash(body.password, null, null, function(error, hash){
            user.password = hash;
            if (user.name !== null && user.surname !== null && user.email !== null){
                user.save((error, userStored) => {
                    if (error){
                        response.status(500).send({message:'Error al guardar usuario'});
                    }
                    else{
                        response.status(200).send(userStored);
                    }
                });
            }
            else {
                response.status(400).send({message: 'No se han introducido todos los campos.'});
            }
        });
    }
    else {
        response.status(400).send({message: 'No se ha introducido contraseña.'});
    }
}

module.exports = {pruebas, saveUser};