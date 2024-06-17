const express = require('express');
const cors = require('cors');
const db = require('./dbConfig');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//Socket.io
const http = require('http');
const { Server } = require('socket.io');

// Create an instance of Express
const app = express();

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Routes
const chatRouter = require("./routes/Messages");
const homeRouter = require("./routes/LoginSignup");
const { disconnect } = require('process');

app.use("/chat", chatRouter);
app.use("/home", homeRouter);

// Create an HTTP server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// Listen for new connections from clients
io.on("connection", (socket) => {
  console.log('User connected:', socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});
// Start the server
const port = 3500;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

