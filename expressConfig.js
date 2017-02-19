'use strict';

var expressLib = require('express');
var bodyParser = require('body-parser');

var express = expressLib();


// cargar rutas
var userRoutes = require('./routes/userRoutes');




express.use(bodyParser.urlencoded({extended:false}));
express.use(bodyParser.json());

// configurar cabeceras http


//rutas base
express.use('/api', userRoutes);



express.get('/estado', function(request, response){
    response.status(200).send({message:'Servicio activo.'});
});

module.exports = express;



