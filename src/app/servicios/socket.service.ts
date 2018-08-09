import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket = socketIo('http://localhost:5000')
  constructor() { 

  }
}
