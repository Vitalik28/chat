import React, { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import './chatwindow.css';

interface ChatWindowProps {
  socket: Socket;
}

const ChatWindow: FC<ChatWindowProps> = ({ socket }) => {
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    socket.on('chatToClient', (message) =>
      setMessages((prev) => [...prev, message])
    );
  }, [socket]);
  return (
    <div className="window">
      {messages.map((message) => (
        <p>{message}</p>
      ))}
    </div>
  );
};

export default ChatWindow;
