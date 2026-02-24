"use client";

import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "https://skilllinkup-production.up.railway.app";

// Singleton socket instance - connects to Railway for WebSocket support
// Vercel serves the app, Railway handles real-time chat
export const socket: Socket = io(`${SOCKET_URL}/chat`, {
  autoConnect: false,
  transports: ["websocket", "polling"],
  withCredentials: true,
});
