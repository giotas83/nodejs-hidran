// EVENTI

import * as Evt from 'events';

const events = new Evt.EventEmitter();

// ricevo evento e lancio funzione callback, ogni volta che l'evento viene emesso
events.on('onMioEvento', (data)=> { // ascoltatore 1
    console.log('evento onMioEvento: ', data);
})

console.log('emit evento 1');
events.emit('onMioEvento', [11,11,11,11]); // emetto evento 1

//aggiungo un altro ascoltatore all'evento, ogni volta che l'evento viene emesso // ascoltatore 2
events.addListener('onMioEvento', writeData); // NON RICEVO EVENTO 1, l'emit è precedente alla registrazione dell'evento

function writeData(data: number[]) {
    console.log('writeData: ', data);
}

// emetto una seconda volta per farlo ascoltare da entrambi gli ascoltatori
console.log('emit evento 2');
events.emit('onMioEvento', [22,22,22,22]); // evento 2

events.once('onMioEvento', (data)=> { // ascoltatore 3 , once riceve una sola volta, solo evento 3
    console.log('evento onMioEvento ricevuto una sola volta: ', data);
})

console.log('emit evento 3');
events.emit('onMioEvento', [33,33,33,33]); // evento 3
console.log('emit evento 4');
events.emit('onMioEvento', [44,44,44,44]); // evento 4

// STREAMS E BUFFER
// video --formato da pezzetti -- >   | | | | | | | | | | | |    ---> può capitare che durante la visualizzaz non si carichi il pezzo successivo e il video si ferma
// | | | | | | | | | | | | | ----- utilizzo di buffer ---->   [|||||||    ]   contenitore di parti di video,  appena il buffer è pieno abbastanza inizia il video
// nel frattempo si riempie di altre parti  | | | | | | | | | -------> [|||||||||  ]   ---> ||||||||     ||||||||    play
// questo è uno stream

import * as fs from 'fs';

console.log(__dirname);
//creo stram di dati
const readStr = fs.createReadStream(__dirname + '/dati.txt'); // legge un file
const writeStr = fs.createWriteStream(__dirname + '/copia-dati.txt'); // crea un nuovo file

// ascolto gli eventi stream

// leggibile e dati ricevuti
/* readStr.on('readable', ()=> { // quando leggibile
    console.log('stream pronto', readStr.read()); // qui arrivano i dati, buffer
}); */

// quando inizia a ricevere dati, usare al posto di readable
readStr.on('data', (data)=> { // data = buffer
    console.log(data); // buffer
    //console.log(data.toString()) // contenuto convertito
    // scrivo nel nuovo file
    writeStr.write(data)
});

// gestire errore in lettura e scrittura
readStr.on('error', (err)=> console.error(err));
writeStr.on('error', (err)=> console.error(err));

// PIPE STREAM
// collego i 2 flussi, lettura e scrittura con un tubo, come se fosse acqua
// redireziona i dati da una sorgente all altra
//creo stram di dati
const readStr2 = fs.createReadStream(__dirname + '/dati.txt'); // legge un file
const writeStr2 = fs.createWriteStream(__dirname + '/copia-dati-2.txt'); // crea un nuovo file
readStr2.pipe(writeStr2);

// creare file zip
// leggo il file con lo stream e il buffer interno, lo passo a gzip con un pipe che comprime il file, creo il file compresso e scrivo al suo interno
import * as zLib from 'zlib';

const gZip = zLib.createGzip(); // comprime il file
const readStr3 = fs.createReadStream(__dirname + '/dati.txt'); // legge un file
const writeStrZip3 = fs.createWriteStream(__dirname + '/copia-dati-3.gz'); // crea un nuovo file zip

readStr3.pipe(gZip).pipe(writeStrZip3);


