import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  // const [room, setRoom] = useState('');

  const loginUser = () => {
    if (name) {
      sessionStorage.setItem('user', JSON.stringify({ name }));
      navigate('/chat');
    }
  };
  return (
    <div className="flex h-96 lg:w-1/4 sm:w-2/4 mx-auto my-auto bg-white rounded-xl shadow-lg  py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <h1 className="text-xl font-medium text-black text-center">
          Join A Chat
        </h1>
        <div className="flex flex-col ">
          <label className="text-xl mt-3">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            className="p-2 mt-3 border border-indigo-600"
          />
          {/* <label className="text-xl mt-3">Room ID</label>
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            className="p-2 mt-3 border border-indigo-600"
          /> */}
          <button
            className="mt-3 block bg-indigo-600 text-xl font-bold  text-white p-2"
            onClick={loginUser}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
