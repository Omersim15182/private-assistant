// Import required modules
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createSocket } = require("./sockets/appSocket");
require("dotenv").config();

// Socket.io dependencies
const http = require("http");
const { Server } = require("socket.io");

// Create an instance of Express
const app = express();

// Middleware setup
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
app.use(express.json());

// Routes setup
const chatRouter = require("./routes/Messages");
const landingPageRouter = require("./routes/LoginSignup");
const contactRouter = require("./routes/Contacts");
const logoutRouter = require("./routes/Loguot");

app.use("/chat", chatRouter);
app.use("/landingPage", landingPageRouter);
app.use("/contacts", contactRouter);
app.use("/logout", logoutRouter);

// Create an HTTP server using Express app
const server = http.createServer(app);

// Start the server
const PORT = 3500;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Initialize socket.io
createSocket(server);
