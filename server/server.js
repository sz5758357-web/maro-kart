const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use("/game", express.static(path.join(__dirname, "../game")));
app.use("/controller", express.static(path.join(__dirname, "../controller")));
app.use("/assets", express.static(path.join(__dirname, "../assets")));

let players = {};

io.on("connection", socket => {

    socket.on("join-controller", name => {

        players[socket.id] = {
            name,
            x:0,
            y:0,
            accel:false,
            brake:false,
            drift:false
        };

        io.emit("players", players);

    });

    socket.on("input", data => {

        if(players[socket.id]){

            players[socket.id]={
                ...players[socket.id],
                ...data
            };

            io.emit("players", players);

        }

    });

    socket.on("disconnect",()=>{

        delete players[socket.id];
        io.emit("players",players);

    });

});

server.listen(3000,()=>{

    console.log("SUPER DRIFT KART");
    console.log("http://localhost:3000/game");

});
