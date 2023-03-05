import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMessageDto } from './dto/create-message';
import { Message } from './message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message) private messageRepository: typeof Message,
  ) {}
  async createUser(dto: CreateMessageDto) {
    const message = await this.messageRepository.create(dto);
    return message;
  }

  async getAllMessage(userId: string) {
    const messages = await this.messageRepository.findAll({
      include: { all: true },
    });
    return messages;
  }
}
