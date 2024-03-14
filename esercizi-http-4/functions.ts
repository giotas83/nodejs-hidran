import * as http from "http";


export const getTodos = (resp: http.IncomingMessage) => {
  // stream
  let response = "";
  resp.on("data", (chunk: any) => {
    // stream
    response += chunk;
  });
  resp.on("end", () => {
    try {
      const todos = JSON.parse(response);
      console.log(todos);
      return todos;
    } catch (e) {
      console.log(e);
    }
  });
};

// in js
/* module.exports = {
  getTodos,
}; */
