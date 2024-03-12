
// senza typescript
// const fs = require('fs');

// con typescript si usa l'import
import * as fs from 'fs';

/* fs.writeFile('./modulo-2/test.json', JSON.stringify({nome: 'test'}), (err)=> {
    if(err) {
        console.error(err);
    } else {
        console.error('file test.json creato e scritto');
    }
});

fs.readdir('./modulo-2', (err, files) => {
    if(err) {
        console.error(err);
        return;
    }
    console.log('file letti: ', files);
}) */

// qui mi assicuro che prima venga aviat writefile e poi readdir, con le promises
async function scriviEleggiCartella() {
  try {
    // Scrivi il file
    await fs.promises.writeFile("./modulo-2/test.json", JSON.stringify({ nome: "test" }));
    console.log("File scritto con successo.");

    // Leggi la directory
    const files = await fs.promises.readdir("./modulo-2");
    console.log("Contenuto della directory:", files);
  } catch (errore) {
    console.error("Si è verificato un errore:", errore);
  }
}

scriviEleggiCartella();

// oltre ad usare fs.promises posso usare anche utils promisify (trasforma il return di un metodo in una promise),
// in questo esempio creo un file di log, senza cancellare il contenuto scritto in precedenza
//const util = require("util"); // node js non ts
import * as util from 'util';

const appendFile = util.promisify(fs.appendFile);
const readFile = util.promisify(fs.readFile);

// scrive e legge il file, ripsettando la tempistica di scrittura e lettura
async function scriviLog(messaggio: string, filePath: string) {
  // Aggiungi il messaggio al file di log
  await appendFile(filePath, messaggio + "\n")
    .then(() => {
      console.log("Messaggio di log aggiunto con successo.");
    })
    .catch((errore) => {
      console.error("Si è verificato un errore:", errore);
    });
  let file = await readFile(filePath);
  console.log('contenuto del file:\n', file.toString());

}

scriviLog("Questo è un messaggio di log", "./modulo-2/mioFileLog.txt"); 


