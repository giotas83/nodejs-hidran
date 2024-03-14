//const express = require('express');
//const func = require('./functions/functions');

import express from 'express';
import {getTodos} from './functions/functions';

const app = express();
app.listen(3000);

/** ************ FILE STATICO */
// PUò ESSERE UN HTML, JSON, XML, SCRIPT (file statico: il serve nn lo processa , viene consegnato e basta)
// se file grossi conviene utilizzare un reverse proxy tipo ngnix
// use: esegue dei middleware, prima della richiesta use('/..', ()=> {middleware})
// se usiamo use senza nulla possiamo passare file statici, ho creato una cartella public con file statici
// se mi collego localhst:3000 mando il file rotta /
app.use(express.static('./esercizi-express-6/public')); // dentro public ho un file index.html, se utilizzo un altro nome devo specificarlo

/**ROTTE ******************************** */

/* app.get('/', (req, res) => { // mando il file statico sopra
    res.send({nome: 'giovanni'})
}); */

// con queryparam
app.get('/todos', (req, resp) => { // /todos?nome=giovanni
    resp.send(req.query.nome); // esempio, rimando al client la query nome dell'url
})

// con path, se voglio mettere constrain(sicuro di mandare un numero) metto :mioNUmber([0-9]+), es /todos/2
app.get('/todos/:mioNumber([0-9]+)', async (req, resp) => {
    //resp.send(req.params.mioNumber);
    const pathParam: string = req.params['mioNumber'];
    console.log('param: ', pathParam);
    try{
        const todos = await getTodos(pathParam);
        console.log('dopo metodo: ', todos);
        resp.send(todos.data)
    } catch(e) {
        console.log('dopo errore metodo', e);
        resp.status(500).send(e)
    }

})

// catturo solo se mi arrivano lettere in path, se mando un numero non entra qui
app.get("/todos/:city([a-zA-z]+)", (req, resp) => {
  resp.send(req.params.city);
});