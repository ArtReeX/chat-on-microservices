import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Model, ObjectionModule } from 'nestjs-objection';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './models/user.model';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret-without-rsa-:)',
      signOptions: { expiresIn: '1d' },
    }),
    ObjectionModule.forRoot({
      Model,
      config: {
        client: 'mysql',
        useNullAsDefault: true,
        connection: {
          host: '206.189.53.245',
          password: 'cnfhn01012020',
          user: 'bpmka',
          database: 'test-lnu',
        },
      },
    }),
    ObjectionModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
