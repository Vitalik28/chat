import { DataType, Table, Model, Column, HasMany } from 'sequelize-typescript';
import { Message } from 'src/message/message.model';

interface CreateUserAtr {
  id: number;
  login: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, CreateUserAtr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  login: string;

  @HasMany(() => Message)
  messages: Message[];
}
