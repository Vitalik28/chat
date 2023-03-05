import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './chat.gateway';
import { Message } from './message/message.model';
import { MessageModule } from './message/message.module';
import { User } from './user/user.model';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'chat',
      models: [User, Message],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    MessageModule,
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
