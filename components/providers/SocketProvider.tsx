"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from "react";
import { socket } from "@/lib/socket-client";
import type { Socket } from "socket.io-client";

interface SocketContextValue {
 socket: Socket;
 isConnected: boolean;
}

const SocketContext = createContext<SocketContextValue>({
 socket,
 isConnected: false,
});

export function useSocket() {
 return useContext(SocketContext);
}

interface SocketProviderProps {
 children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
 const [isConnected, setIsConnected] = useState(false);
 const reconnectAttempts = useRef(0);
 const maxReconnectAttempts = 10;

 useEffect(() =>{
 function onConnect() {
 console.log("[socket] Connected");
 setIsConnected(true);
 reconnectAttempts.current = 0;
 }

 function onDisconnect(reason: string) {
 console.log("[socket] Disconnected:", reason);
 setIsConnected(false);
 }

 function onConnectError(err: Error) {
 console.warn("[socket] Connection error:", err.message);
 setIsConnected(false);

 // Exponential backoff reconnect
 if (reconnectAttempts.current < maxReconnectAttempts) {
 const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
 reconnectAttempts.current++;
 setTimeout(() =>{
 if (!socket.connected) {
 socket.connect();
 }
 }, delay);
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
 <SocketContext.Provider value={{ socket, isConnected }}>
 {children}
 </SocketContext.Provider>
 );
}
