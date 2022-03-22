const express = require("express"); //Access
const socket = require("socket.io");

const app = express(); //Initialize and server ready

app.use(express.static("public"));

let port = process.env.PORT || 5000;
let server = app.listen(port, () => {
    console.log("Listening to port " + port);
})

let io = socket(server);

io.on("connection", (socket) => {
    console.log("Made socket connection");

    // receives data
    socket.on("beginPath", (data) => {
        // data -> data from frontend
        // transfers data to all conneted computers 
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })

    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })
})

