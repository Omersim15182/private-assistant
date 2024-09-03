// Import required modules
require("reflect-metadata"); // Required for TypeORM
const { createConnection } = require("typeorm");
const typeormConfig = require("./typeorm.config");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createSocket } = require("./sockets/appSocket");

require("dotenv").config();

// Socket.io dependencies
const http = require("http");

// Create an instance of Express
const app = express();

// Initialize TypeORM
createConnection(typeormConfig)
  .then(() => {
    console.log("Database connected");

    // Middleware setup
    app.use(cookieParser());
    app.use(
      cors({
        origin: "http://localhost:5173", // Allow requests from this origin
        credentials: true, // Allow credentials (cookies) to be sent
      })
    );
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb" }));
    // Routes setup
    const chatRouter = require("./routes/Messages");
    const loginRouter = require("./routes/Login");
    const signupRouter = require("./routes/Signup");
    const contactRouter = require("./routes/Contacts");
    const logoutRouter = require("./routes/Loguot");

    app.use("/chat", chatRouter);
    app.use("/landingPage/login", loginRouter);
    app.use("/landingPage/signup", signupRouter);
    app.use("/contacts", contactRouter);
    app.use("/logout", logoutRouter);

    // Create an HTTP server using Express app
    const server = http.createServer(app);

    // Start the server
    const PORT = 3500;

    // Initialize socket.io
    createSocket(server);

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
