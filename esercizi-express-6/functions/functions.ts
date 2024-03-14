//const axios = require('axios');
import axios from 'axios';

export const getTodos = async (pathParam: string) => {
    const url = "https://jsonplaceholder.typicode.com/todos" + (pathParam ? "/" + pathParam : "");
    try{
        const result = await axios.get(url);
        return result;
    } catch (error){
        console.log(error);
        throw error;
    }
}

/* module.exports = {
    getTodos
} */
