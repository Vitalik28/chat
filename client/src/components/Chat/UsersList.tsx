import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import UserItem from './Users/UserItem';

interface IUser {
  id: number;
  name: string;
}
interface ChatListProps {
  users: IUser[];
}
const ChatList: FC<ChatListProps> = ({ users }) => {
  return (
    <ListGroup as="ul">
      {users.map((user) => (
        <ListGroup.Item>
          <UserItem key={user.id} name={user.name} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ChatList;
