const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const Moniker = require("moniker");

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
});

app.use(express.static("./client"));

server.listen(port, () => {
    console.log("listening on *:" + port);
});

io.on("connection", socket => {
    socket.username = Moniker.choose();
    socket.emit("set username", socket.username);
    socket.broadcast.emit("user joined", socket.username);
    console.log("connected", socket.username);

    socket.on("disconnect", () => {
        socket.broadcast.emit("user left", socket.username);
    });

    socket.on("chat message", message => {
        // console.log({ message });
        io.emit("chat message", {
            name: socket.username,
            message
        });
    });
});
