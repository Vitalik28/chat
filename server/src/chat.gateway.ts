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
    client.emit('newUsersResponse', users);
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('chatToServer')
  handleMessage(
    client: Socket,
    message: { sender: string; room: string; message: string },
  ) {
    this.wss.to(message.room).emit('chatToClient', message);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    users = users.filter((user) => user.socketId !== client.id);
    client.emit('newUsersResponse', users);
    //Выполняем действия
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    client.emit('newUsersResponse', users);
  }
}
