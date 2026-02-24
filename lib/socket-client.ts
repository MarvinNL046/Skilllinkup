"use client";

import { io, Socket } from "socket.io-client";

// Singleton socket instance for /chat namespace
// autoConnect: false - SocketProvider controls connection lifecycle
export const socket: Socket = io("/chat", {
  autoConnect: false,
  transports: ["websocket", "polling"],
  withCredentials: true,
});
