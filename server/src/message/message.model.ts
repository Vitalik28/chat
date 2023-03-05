import {
  DataType,
  Table,
  Model,
  Column,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

interface CreateMessageAtr {
  id: number;
  login: string;
}

@Table({ tableName: 'messages' })
export class Message extends Model<Message, CreateMessageAtr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  toWhom: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
