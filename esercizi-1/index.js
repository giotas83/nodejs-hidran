let myName = 'Nodejs';
console.log('mio nome: ', myName);

let FUNC = require('./functions');

console.log(FUNC.NOME);
console.log(FUNC.add(2,6));
console.log(FUNC.sottrazione(5,8));
console.log(__filename);
console.log(__dirname);

// global -> globale  come window su browser
// process -> globale
console.log(process.argv);

const CONFIG = require('./config');
console.log(CONFIG);

const api = require('./api');
console.log(api)