// Import required modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createSocket } = require('./sockets/appSocket'); 
require('dotenv').config(); 

// Socket.io dependencies
const http = require('http');
const { Server } = require('socket.io');

// Create an instance of Express
const app = express();

// Middleware setup
app.use(cookieParser()); 
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow credentials (cookies) to be sent
}));
app.use(express.json()); 

// Routes setup
const chatRouter = require("./routes/Messages");
const homeRouter = require("./routes/LoginSignup");
app.use("/chat", chatRouter); 
app.use("/home", homeRouter); 

// Create an HTTP server using Express app
const server = http.createServer(app);

// Start the server
const port = 3500;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Initialize socket.io
createSocket(server); 
