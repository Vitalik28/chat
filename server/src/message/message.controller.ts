import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Get()
  getAll(@Query() query) {
    return this.messageService.getAllMessage(query);
  }
}
