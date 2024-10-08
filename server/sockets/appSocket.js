const ioSocket = require("socket.io");

exports.createSocket = (server) => {
  const io = ioSocket(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("connection from client");

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      socket.broadcast.emit("callEnded");
    });

    // Listen for messages from the client
    socket.on("clientMsg", (msg) => {
      console.log("client msg is : ", msg); // test the client msg from postman

      // Send a message from server to client
      io.sockets.emit("serverMsg", msg);
      console.log("server msg is : ", msg); // test the server event from postman
    });
  });
};
