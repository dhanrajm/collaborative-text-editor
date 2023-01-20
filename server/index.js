/**
 * y-websocket comes with an implementation of the backend server.
 * But the server start up script from y-websocket was not flexible enough.
 * Also it was better to keep a seperate server folder for code separation and containerization.
 *
 */
const { config } = require("dotenv");
const WebSocket = require("ws");
const http = require("http");
// Load the utils function from the library itslef.
const { setupWSConnection } = require("./node_modules/y-websocket/bin/utils");

config();
const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

process.on("uncaughtException", (err) => {
  console.log(`uncaught exception: ${err}`);

  // we are not handling any exit process. So just exit.
  // other wise we could have called another function to do clean up and then exit
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log(`unhandled rejection: ${err}`);
  throw err;
});

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("okay");
});

const wss = new WebSocket.Server({ server });
wss.on("connection", setupWSConnection);

server.on("error", (e) => {
  console.log(JSON.stringify(e));
});

server.listen(5004, () => {
  console.log(`running at ${host} on port ${port}`);
});
