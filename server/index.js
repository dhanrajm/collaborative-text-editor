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

config()
const host = process.env.SERVER_HOST
const port = process.env.SERVER_PORT

const wss = new WebSocket.Server({ noServer: true });
const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("okay");
});

wss.on("connection", setupWSConnection);

server.on("upgrade", (request, socket, head) => {
  const handleAuth = (ws) => {
    wss.emit("connection", ws, request);
  };
  wss.handleUpgrade(request, socket, head, handleAuth);
});

server.listen(port, host, () => {
  console.log(`running at ${host} on port ${port}`);
});
