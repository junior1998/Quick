import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket = socketIo('http://10.0.0.4:5000')
  constructor() { 

  }
}
