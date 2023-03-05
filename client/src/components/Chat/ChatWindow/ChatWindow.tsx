import React, { FC, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import './chatwindow.css';

interface ChatWindowProps {
  socket: Socket;
}

interface IMessage {
  name: string;
  time: string;
  message: string;
}

const ChatWindow: FC<ChatWindowProps> = ({ socket }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<null | HTMLSpanElement>(null);

  useEffect(() => {
    socket.on('chatToClient', (message) =>
      setMessages((prev) => [...prev, message])
    );
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);
  
  return (
    <div className="window">
      {messages.map((message) => (
        <>
          <p>{message.name}</p>
          <p>{message.message}</p>
          <p>{message.time}</p>
        </>
      ))}
      <span ref={messagesEndRef}></span>
    </div>
  );
};

export default ChatWindow;
