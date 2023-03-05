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

  const sendMessage = () => {
    if (message) {
      socket.emit('chatToServer', message);
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
        />
        <Button onClick={sendMessage}>Отправить</Button>
      </InputGroup>
    </div>
  );
};

export default SendMessageFrom;
