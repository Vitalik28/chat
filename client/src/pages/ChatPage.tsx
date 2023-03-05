import { log } from 'console';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import ChatList from '../components/Chat/ChatList';

interface IUser {
  name: string;
  room: string;
}
let socket = io('http://localhost:3001/chat');

const ChatPage = () => {
  const [socketRes, setSocketResp] = useState(socket);
  const [name, setName] = useState<string>('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem('user')) return;
    if (sessionStorage.getItem('user')) {
      let user: IUser = JSON.parse(sessionStorage.getItem('user') || '[]');
      setName(user.name);
    }
    if (!name) return;
    socket.emit('newUser', { id: Date.now(), name });
  }, [name]);

  useEffect(() => {
    socket.on('newUsersResponse', (data) => setUsers(data));
  }, [users,socket]);

  return name ? (
    <div>
      <ChatList users={users} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ChatPage;
