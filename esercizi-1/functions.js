
function add(a, b) {    
    return a+b;
}

const NOME = 'GIOVANNI';

module.exports = {
    add: add,
    NOME,
    sottrazione: (a,b)=> a-b
}

// oppure esportare così
// exports.NOME = NOME;