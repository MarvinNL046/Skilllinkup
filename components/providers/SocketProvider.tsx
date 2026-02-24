"use client";

import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from "react";
import { socket } from "@/lib/socket-client";
import type { Socket } from "socket.io-client";

interface SocketContextValue {
 socket: Socket;
 isConnected: boolean;
 /** True when all reconnect attempts are exhausted */
 connectionFailed: boolean;
}

const SocketContext = createContext<SocketContextValue>({
 socket,
 isConnected: false,
 connectionFailed: false,
});

export function useSocket() {
 return useContext(SocketContext);
}

interface SocketProviderProps {
 children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
 const [isConnected, setIsConnected] = useState(false);
 const [connectionFailed, setConnectionFailed] = useState(false);
 const reconnectAttempts = useRef(0);
 const maxReconnectAttempts = 3;

 useEffect(() =>{
 function onConnect() {
 console.log("[socket] Connected");
 setIsConnected(true);
 setConnectionFailed(false);
 reconnectAttempts.current = 0;
 }

 function onDisconnect(reason: string) {
 console.log("[socket] Disconnected:", reason);
 setIsConnected(false);
 }

 function onConnectError(err: Error) {
 setIsConnected(false);

 if (reconnectAttempts.current < maxReconnectAttempts) {
 // Only log the first error to avoid console spam
 if (reconnectAttempts.current === 0) {
 console.warn("[socket] Connection error:", err.message, "— will retry up to", maxReconnectAttempts, "times");
 }
 const delay = Math.min(2000 * Math.pow(2, reconnectAttempts.current), 30000);
 reconnectAttempts.current++;
 setTimeout(() =>{
 if (!socket.connected) {
 socket.connect();
 }
 }, delay);
 } else {
 // Give up — stop retrying to avoid request spam
 console.warn("[socket] Gave up after", maxReconnectAttempts, "attempts. Real-time updates unavailable.");
 setConnectionFailed(true);
 }
 }

 socket.on("connect", onConnect);
 socket.on("disconnect", onDisconnect);
 socket.on("connect_error", onConnectError);

 // Connect on mount
 if (!socket.connected) {
 socket.connect();
 }

 return () =>{
 socket.off("connect", onConnect);
 socket.off("disconnect", onDisconnect);
 socket.off("connect_error", onConnectError);
 socket.disconnect();
 };
 }, []);

 return (
 <SocketContext.Provider value={{ socket, isConnected, connectionFailed }}>
 {children}
 </SocketContext.Provider>
 );
}
