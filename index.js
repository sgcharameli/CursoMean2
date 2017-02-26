'use strict';

console.log('Iniciando index.js');

var mongoose = require('mongoose');
var express = require('./expressConfig');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/curso_mean2', (err, res) => {
    if(err){
        throw err;
    }
    else {
        console.log('Se ha conectado correctamente con la base de datos.');
        express.listen(port, function(){
            console.log('Servicio levantado en http://localhost:'+port);
        });
    }
});

console.log('Finalizando index.js');