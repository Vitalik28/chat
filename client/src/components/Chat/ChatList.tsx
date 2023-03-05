import React, { FC } from 'react';
import UserItem from '../User/UserItem';

interface IUser {
  id: number;
  name: string;
}
interface ChatListProps {
  users: IUser[];
}
const ChatList: FC<ChatListProps> = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <UserItem key={user.id} name={user.name} />
      ))}
    </div>
  );
};

export default ChatList;
