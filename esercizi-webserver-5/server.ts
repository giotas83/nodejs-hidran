import * as http from'http';
import * as url from 'url';
//import * as ax from 'axios';
import * as fs from 'fs';

// da browser localhost:2000
// se voglio riempire reqUrl posso chiamare inserendo dati all url http://localhost:2000/ciao?nome=test
// req: richiesta arrivata, resp: response da mandare
// CREO UN SERVER -> localhost:2000
const server = http.createServer((req, resp) => {
    console.log('mi sta chiamando: ', req.url); // stringa
    const reqUrl = url.parse(req.url as string);
    console.log('url scompattato: ', reqUrl);
    
    // chiudere la response
    resp.end('mi hai chiamato da: ' + req.url); // per non far rimanere il fe in pending che aspetta una risposta, si deve chiudere la risposta
});
server.listen(2000)

/* ******************************************************************************/
export const MYURL = "https://jsonplaceholder.typicode.com";
//const ax = require('axios')
import axios from 'axios';

// server che in base all url invia un file statico
const server2 = http.createServer((req, resp) => {
    const {pathname, query} = url.parse(req.url as string);
    switch (pathname) { // se localhost:3000 arriva /
        case '/':
            // creo uno stream del file index.html
            const fileIndex = fs.createReadStream('./esercizi-webserver-5/index.html')
            //mando nella response
            resp.writeHead(200, {'Content-Type': 'text/html'})
            fileIndex.pipe(resp); // collego il file con un tubo verso la response
            break;
        case '/todos':
        console.log(MYURL+pathname)
        axios.get(MYURL+pathname).then( (data) => {
            console.log(data);
            resp.writeHead(200, {'Content-Type': 'application/json'});
            //resp.end(JSON.stringify(data))
            resp.end(JSON.stringify(data.data));
        }).catch((err: any) =>  { 
            console.log(err);
            resp.writeHead(500);
            resp.end('errore 500');
        })
        break;    
        default:
              resp.writeHead(400);
              resp.end('bad request');
            break;
    }
});
server2.listen(3000);

