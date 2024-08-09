const ioSocket = require("socket.io");

exports.createSocket = (server) => {
  const io = ioSocket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("connection from client");

    // Emit the socket ID to the client
    io.sockets.emit("me", socket.id);

    // Handle disconnection
    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
    });

    // Listen for messages from the client
    socket.on("clientMsg", (msg) => {
      console.log("client msg is : ", msg); // test the client msg from postman

      // Send a message from server to client
      io.sockets.emit("serverMsg", msg);
      console.log("server msg is : ", msg); // test the server event from postman
    });

    // Handle call requests from clients
    socket.on("callUser", (data) => {
      io.to(data.userToCall).emit("callUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
      });
      console.log("callUser", data);
    });

    // Handle call acceptance from clients
    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
      console.log("answerCall", data);
    });
  });
};
