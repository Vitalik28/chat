import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

interface IUser {
  id: number;
  socketId: string;
  name: string;
}

let users: IUser[] = [];

@WebSocketGateway({
  namespace: '/chat',
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }
  @SubscribeMessage('newUser')
  handleEvent(client: Socket, data: { id: number; name: string }) {
    users.push({ socketId: client.id, ...data });
    this.wss.emit('newUsersResponse', users);
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('chatToServer')
  handleMessage(
    client: Socket,
    message: { message: string },
  ) {
    // this.wss.to(message.room).emit('chatToClient', message);
    this.wss.emit('chatToClient', message);
  }
  
  handleConnection(client: Socket, ...args: any[]) {}

  handleDisconnect(client: Socket) {
    users = users.filter((user) => user.socketId !== client.id);
    this.wss.emit('newUsersResponse', users);
  }
}
