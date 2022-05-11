const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");

const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

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

  socket.broadcast.emit("connection-success", {
    status: "connection-success",
    socketId: socket.id
  });

  socket.on("disconnect", () => {
    console.log("User disconnected 🥸", socket.id);
  });

  socket.on("sdp", (data) => {
    console.log("😧", data);
    socket.broadcast.emit("sdp", data);
  });
});

// routes
app.get("/Auth", (req, res) => {
  console.log(`Request at ${`/Auth`}`);
  res.status(200).send({ AuthData: true });
});

app.get("/Browse", (req, res) => {
  console.log(`Request at ${`/Browse`}`);
  res.status(200).send({ BrowseData: true });
});

app.get("/Donate", (req, res) => {
  console.log(`Request at ${`/Donate`}`);
  res.status(200).send({ DonateData: true });
});

app.get("/Home", (req, res) => {
  console.log(`Request at ${`/Home`}`);
  res.status(200).send({ HomeData: true });
});

app.get("/Item", (req, res) => {
  console.log(`Request at ${`/Item`}`);
  res.status(200).send({ ItemData: true });
});

app.get("/Transactions", (req, res) => {
  console.log(`Request at ${`/Transactions`}`);
  res.status(200).send({ TransactionsData: true });
});

server.listen(PORT, () => {
  console.log(`Listening to port: ${PORT} 🤑`);
});
