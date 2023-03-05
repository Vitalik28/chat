import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import ChatList from '../components/Chat/UsersList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatWindow from '../components/Chat/ChatWindow/ChatWindow';
import { Spinner } from 'react-bootstrap';
import SendMessageFrom from '../components/Chat/SendMessageForm/SendMessageFrom';
let socket = io('http://localhost:3001/chat');
interface IUser {
  name: string;
  room: string;
}

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
  console.log(socket);

  useEffect(() => {
    socket.on('newUsersResponse', (data) => setUsers(data));
  }, [users, socket]);

  return name ? (
    <Container>
      <Row>
        <Col xs lg="3">
          <ChatList users={users} />
        </Col>
        <Col>
          <ChatWindow socket={socket} /> 
          <SendMessageFrom socket={socket} />
        </Col>
      </Row>
    </Container>
  ) : (
    <Spinner />
  );
};

export default ChatPage;
