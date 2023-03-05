import React, { FC } from 'react';

interface UserItemProps {
  name: string;
}
const UserItem: FC<UserItemProps> = ({ name }) => {
  return <span>{name}</span>;
};

export default UserItem;
