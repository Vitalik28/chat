import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const joinRoom = () => {
  //   if (name !== '' && room !== '') {
  //     socket.emit('joinRoom', room);
  //     setShowChat(true);
  //   }
  // };

  return (
    <div className="flex justify-center align-middle min-w-screen min-h-screen bg-slate-50 h-1">
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
