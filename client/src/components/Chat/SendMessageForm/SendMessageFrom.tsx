import React, { FC, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Socket } from 'socket.io-client';

interface SendMessageFormProps {
  socket: Socket;
}
const SendMessageFrom: FC<SendMessageFormProps> = ({ socket }) => {
  const [message, setMessage] = useState('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!message) return;
    const user = JSON.parse(sessionStorage.getItem('user') || '[]');
    const messageData = {
      ...user,
      message,
      time:
        new Date(Date.now()).getHours() +
        ':' +
        new Date(Date.now()).getMinutes(),
    };

    await socket.emit('chatToServer', messageData);
    // setMessageList((list) => [...list, messageData]);
    setMessage('');
  };

  const sendKeyMessage = async (e: React.KeyboardEvent) => {
    if (!message.trim()) return;
    if (e.keyCode === 13) {
      const user = JSON.parse(sessionStorage.getItem('user') || '[]');
      const messageData = {
        ...user,
        message,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('chatToServer', messageData);
      // setMessageList((list) => [...list, messageData]);
      setMessage('');
    }
  };

  return (
    <div>
      <InputGroup className="mt-2">
        <Form.Control
          as="textarea"
          aria-label="With textarea"
          value={message}
          onChange={changeHandler}
          onKeyDown={sendKeyMessage}
        />
        <Button onClick={sendMessage}>Отправить</Button>
      </InputGroup>
    </div>
  );
};

export default SendMessageFrom;
