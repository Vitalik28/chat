import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessageController } from './message.controller';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
  imports: [SequelizeModule.forFeature([Message])],
  exports: [MessageService],
})
export class MessageModule {}
