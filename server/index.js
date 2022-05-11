const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");

const DB = require("./DB/index");
const auth = require("./auth/index");

const PORT = 8080;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(auth.session);
app.use(auth.sessionEnd);

// ===========for Chat====================================
const io = new Server(server, {
  cors: {
    origin: "*",
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

  socket.on("sdp", (data) => {
    socket.broadcast.emit("sdp", data);
  });

  socket.on("candidate", (data) => {
    socket.broadcast.emit("candidate", data);
  });
});

// Routes
app.get("/user/login", async (req, res) => {
  try {
    const [userName, isAuthed] = await auth.user(req.query);
    if (isAuthed) {
      const userData = await DB.GET.user({ userName });
      req.user = userData;
      res.status(200).send({ user: userData });
    } else {
      res.status(200).send({ user: null });
    }
  } catch (err) {
    console.log("Auth user error ", err.message);
  }
});

app.get("/Auth", (req, res) => {
  res.status(200).send({ AuthData: true });
});

app.get("/Browse", (req, res) => {
  res.status(200).send({ BrowseData: true });
});

app.get("/Donate", (req, res) => {
  res.status(200).send({ DonateData: true });
});

app.get("/Home", (req, res) => {
  res.status(200).send({ HomeData: true });
});

app.get("/Item", (req, res) => {
  res.status(200).send({ ItemData: true });
});

app.get("/Transactions", (req, res) => {
  res.status(200).send({ TransactionsData: true });
});

app.get("/Item", (req, res) => {
  console.log(`Request at ${`/Item`}`);
  res.status(200).send({ ItemData: true });
});

app.get("/Transactions", (req, res) => {
  console.log(`Request at ${`/Transactions`}`);
  res.status(200).send({ TransactionsData: true });
});

app.get("/data/*", async (req, res) => {
  const reqPath = req.path.split("/").filter((str) => !!str.length);
  reqPath[0] = "GET";
  const params = req.query;

  try {
    var query = DB;
    reqPath.forEach((route) => {
      query = query[route];
    });
    const dbRes = await query(params);
    res.status(200).send(dbRes);
  } catch (err) {
    console.log(`GET req err ${err.message} \nPATH ${req.path}`);
    res.status(500).send({ error: true });
  }
});

app.post("/AddDonation:charityID", (req, res) => {
  console.log(`Request at ${`/AddDonation:charityID`}`);
  res.status(201).send({ TransactionsData: true });
});

app.post("/AddReview:userID", (req, res) => {
  console.log(`Request at ${`/AddReview:userID`}`);
  res.status(201).send({ TransactionsData: true });
});

app.put("/InterestInDonation/:userID", (req, res) => {
  //NEED TO GET ITEM ID TOO
  console.log(`Request at ${`/InterestInDonation/:userID`}`);
  res.status(204).send({ TransactionsData: true });
});

app.put("/ApproveUserClaim/:userID", (req, res) => {
  //NEED TO GET ITEM ID TOO
  console.log(`Request at ${`/ApproveUserClaim/:userID`}`);
  res.status(204).send({ TransactionsData: true });
});

app.put("/AdminApproveUser/:userID", (req, res) => {
  console.log(`Request at ${`/AdminApproveUser/:userID`}`);
  res.status(204).send({ TransactionsData: true });
});

// server listening
server.listen(PORT, () => {
  console.log(`Listening to port: ${PORT} `);
});
