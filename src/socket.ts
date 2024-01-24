import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
// import { useEffect } from "react";
class SocketService {
    private socket: Socket | null = null;
  
    public connect(url: string): void {
      this.socket = io(url);
  
      this.socket.on('connection', () => {
        console.log('Connected to Socket.IO server');
      });
  
      this.socket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
      });
  
      // Additional event listeners can be set up here
    }
  
    public disconnect(): void {
      if (this.socket) {
        this.socket.disconnect();
      }
    }
    public emit(event: string,data:any):void{
      this.socket?.emit(event,data)
    }
    // You can add more methods to send/receive data, subscribe to events, etc.

    public on(event: string,data: any){
      this.socket?.on(event, data);
    }

    public off(event: string, callback: (data: any) => void):void{
      useEffect(()=>{
        return () => {
          this.socket?.off(event, callback);
      };
      },[event,callback]);
    } 

  }
  
  export const socketService = new SocketService();