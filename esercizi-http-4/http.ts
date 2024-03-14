import * as https from 'https';
import * as http from 'http';
import {MYURL, STATUS_CODE} from './constants';
import { getTodos } from "./functions";

const path = process.argv[2] || 'todos'; // prendo dalla console se scrivo un parametro quando lancio http.ts  nodemon http.ts todos

try{
    const req = https.get(MYURL + path, (resp) => {
     // resp.pipe(process.stdout); // stsmpo in console lo stream
      console.log(resp.statusCode);

      switch (resp.statusCode) {
        case 200:
          getTodos(resp);
          break;
        case 401:
          console.log("verifica il tuo userid");
          break;
        case 404:
          console.log("invalid request");
          break;
        default:
          console.log(
            "descrizione errore",
            STATUS_CODE[resp.statusCode as number]
          );
          break;
      }
    });
} catch(e){
    console.log(e);
}

