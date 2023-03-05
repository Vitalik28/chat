import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

interface UserItemProps {
  name: string;
}
const UserItem: FC<UserItemProps> = ({ name }) => {
  return (
    <Row className="cursor-pointer">
      <Col sx lg={3}>
        <Icon.PersonCircle size={30} />
      </Col>
      <Col>
        <span>{name}</span>
      </Col>
      <Col>online</Col>
    </Row>
  );
};

export default UserItem;
