# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the app locally

### Backend

- `cd server`

- create `.env` file at root folder with following values
```
SERVER_PORT=5004
SERVER_HOST=localhost
```

- `yarn start`

##### The server should runnig at localhost 5004



#### Using docker

- `docker build -t collaborative-text-editor .`

- `docker run -it -e SERVER_PORT=5004 -e SERVER_HOST=localhost --network=host collaborative-text-editor`

##### The server should runnig at localhost 5004



### Frontend

- run `yarn install` at root folder

- create `.env` file at root folder with following values
```
PORT=5000
HOST=localhost
REACT_APP_ENV=development
REACT_APP_SERVER_PORT=5004
REACT_APP_SERVER_HOST=localhost
```

- run `yarn start`



## Brief explaination of architecture and system design

- Websockets are used for communication between client and server. It is ideal for use cases like this since it provides asynchronous and full-duplex connections. With web sockets, messages can be sent with minimal overhead between client and server post the initial handshake. Due to the persistent connection, updates can be sent to clients as soon as they become available. This enables changes in the text editor to be made available in real time to all connected clients.

- For real time collaboration, any change made by the client has to be sent to the server by creating a diff at the client's end. The server then broadcasts this diff to its respective clients. The creator of this diff can use this broadcasted diff as an acknowledgement of his change from the server. Other clients will use this diff to patch their content to get the latest update. This is a high level overview of how collaboration works in this app.

- Having an effective data model is essential for conflict-free diffing and patching across distributed clients. A second perspective on multiple clients updating the same text data is that data is stored in several replicas. These replicas become out of sync when a client updates them. Having a mechanism for coordinating these replicas and bringing them to a consistent state is ideal for our use case. Conflict-free Replicated Data Types or CRDTs accomplish the same goal and prove to be an excellent solution for us.

- I have chosen [Yjs's](https://github.com/yjs/yjs) implementation of CRDT. One common criticism of using CRDT is expensive memory overhead especially in the case of dynamic languages like JavaScript. CRDT uses a lot of metadata to achieve effective real-time collaboration. So any implementation of CRDT has to be optimized for minimal metadata. As explained in this [blog](https://blog.kevinjahns.de/are-crdts-suitable-for-shared-editing/), Yjs is a popular and optimized implementation. Also, Yjs is network agnostic, not coupled with any text editors, supports shared cursors and abstracts network connections. This makes YJS an excellent choice for our use case.

### Tradeoffs
1) Memory overhead could still be high for complex documents. But there is still room for more optimization.
2) Not battle tested enough. 

### Alternatives for using CRDT is 
1) [Differential Synchronization](https://neil.fraser.name/writing/sync/) combined with [diff-match-patch](https://github.com/google/diff-match-patch). Google doc used this and is battle tested compared to CRDT's implementation.

2) [ShareDB](https://github.com/share/sharedb) based on Operational Transformation (OT) of JSON.

3) [Swarm.js](https://github.com/gritzko/swarm) based on [Swarm Replicated Object Notation](https://github.com/google/diff-match-patch)