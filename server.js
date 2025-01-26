import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Send data to the client every 5 seconds
  setInterval(() => {
    const data = {
      value: Math.floor(Math.random() * 100),
      timestamp: new Date().toISOString(),
    };
    socket.emit("data", data);
  }, 5000);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Socket server is running on port 3000");
});
