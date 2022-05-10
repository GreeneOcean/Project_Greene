const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");

const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`User connected 😀: ${socket.id}`);
  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected 🥸", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Listening to port: ${PORT} 🤑`);
});
