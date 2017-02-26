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
        console.log('Password recibida: ' + body.password);
        bcrypt.hash(body.password, null, null, function(error, hash){
            if (error){
                console.error('Error encriptando contraseña: ' + error);
            }
            else {
                console.log('Hash creado: ' + hash);
            }
            user.password = hash;
            if (user.name !== null && user.surname !== null && user.email !== null){
                console.log('Se va a guardar el usuario: ' + user);
                user.save((error, userStored) => {
                    console.log('Saving... - Se va a guardar el usuario: ' + user);
                    if (error){
                        console.error('Se ha producido un error guardando usuario: ' + error);
                        response.status(500).send({message:'Error al guardar usuario'});
                    }
                    else{
                        console.log('Se ha creado usuario correctamente: ' + user);
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

function loginUser(request, response){
    
    var email = request.body.email;
    var password = request.body.password;
    
    userModel.findOne({email: email.toLowerCase()}, (error, user) => {
        if(error){
            response.status(500).send({message: 'Error interno'});
            console.error('Error con base de datos al buscar usuario por email: ' + email);
        }
        else {
            if (!user){
                response.status(404).send({message: 'Usuario no encontrado'});
                console.warn('No se ha encontrado usuario buscando por email: ' + email);
            }
            else {
                bcrypt.compare(password, user.password, function(error, check){
                    if (check){
                        if(request.body.gethash){
                            //Devolvemos jwt
                        }
                        else {
                            response.status(200).send({user});
                        }
                    }
                    else {
                        response.status(400).send({message: 'El usuario no ha podido loguearse'});
                    }
                });
            }
        }
    });
    
}


module.exports = {pruebas, saveUser, loginUser};