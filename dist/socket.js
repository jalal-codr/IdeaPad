import { useEffect } from 'react';
import { io } from 'socket.io-client';
// import { useEffect } from "react";
class SocketService {
    constructor() {
        Object.defineProperty(this, "socket", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
    }
    connect(url) {
        this.socket = io(url);
        this.socket.on('connection', () => {
            console.log('Connected to Socket.IO server');
        });
        this.socket.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server');
        });
        // Additional event listeners can be set up here
    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
    emit(event, data) {
        this.socket?.emit(event, data);
    }
    // You can add more methods to send/receive data, subscribe to events, etc.
    on(event, data) {
        this.socket?.on(event, data);
    }
    off(event, callback) {
        useEffect(() => {
            return () => {
                this.socket?.off(event, callback);
            };
        }, [event, callback]);
    }
}
export const socketService = new SocketService();
