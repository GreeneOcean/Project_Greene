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
      if (userData.id === 1) {
        userData.admin = true;
        userData.pendingList = await DB.GET.charities.pending();
      } else {
        userData.admin = false;
      }
      res.status(200).send({ user: userData });
    } else {
      res.status(200).send({ user: null });
    }
  } catch (err) {
    console.log("Auth user error ", err.message);
  }
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

app.post("/donation", async (req, res) => {
  try {
    console.log(`POST Request at ${`/donation`}`);
    const newDonation = req.body;
    const addRes = await DB.POST.donation(newDonation);
    res.status(201).send({ posted: true });
  } catch (err) {
    console.log(`POST donation res ${err.message} `);
    res.status(500).send({ posted: false });
  }
});

app.put("/donation", async (req, res) => {
  try {
    console.log(`PUT Request at ${`/donation`}`);
    const updatedUser = req.body;
    const addRes = await DB.PUT.donation(updatedUser);
    res.status(201).send({ posted: true });
  } catch (err) {
    console.log(`POST donation res ${err.message} `);
    res.status(500).send({ posted: false });
  }
});

app.post("/user", async (req, res) => {
  try {
    console.log(`POST Request at ${`/user`}`);
    const newUser = req.body;
    newUser.password = auth.hashPassword(newUser.password);
    const addRes = await DB.POST.user(newUser);
    res.status(201).send({ posted: true });
  } catch (err) {
    console.log(`POST donation res ${err.message} `);
    res.status(500).send({ posted: false });
  }
});

app.put("/user", async (req, res) => {
  try {
    console.log(`PUT Request at ${`/user`}`);
    const updatedUser = req.body;
    const addRes = await DB.PUT.user(updatedUser);
    res.status(201).send({ posted: true });
  } catch (err) {
    console.log(`POST donation res ${err.message} `);
    res.status(500).send({ posted: false });
  }
});

app.post("/review", async (req, res) => {
  try {
    const newReview = req.body;
    const addRes = await DB.POST.review(newReview);
    console.log(`Request at ${`/review`}`);
    res.status(201).send({ posted: true, post: newReview });
  } catch (err) {
    console.log(`POST review res ${err.message}`);
    res.status(500).send({ posted: false, post: req.body });
  }
});

app.put("/InterestInDonation", async (req, res) => {
  try {
    const newInterestInDonation = req.body;
    // const addRes
    console.log(`Request at ${`/InterestInDonation`}`);
    res.status(204).send({ TransactionsData: true });
  } catch (err) {
    console.log(`PUT interest donation res ${err.message}`);
    res.status(500).send({ posted: false });
  }
});

app.put("/ApproveUserClaim", async (req, res) => {
  try {
    const newApproveUserClaim = req.body;
    // const addRes
    console.log(`Request at ${`/ApproveUserClaim`}`);
    res.status(204).send({ TransactionsData: true });
  } catch (err) {
    console.log(`PUT approve user claim res ${err.message}`);
    res.status(500).send({ posted: false });
  }
});

app.put("/AdminApproveUser", async (req, res) => {
  try {
    const newAdminApproveUser = req.body;
    // const addRes
    console.log(`Request at ${`/AdminApproveUser`}`);
    res.status(204).send({ TransactionsData: true });
  } catch (err) {
    console.log(`PUT admin approve user res ${err.message}`);
    res.status(500).send({ posted: false });
  }
});

// please keep this as server.listen NOT "app.listen"
server.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
