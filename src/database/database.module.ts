import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../courses/entities/courses.entity';
import { Tag } from '../tags/entities/tags.entity';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          database: configService.get('DB_NAME'),
          entities: [Course, Tag, User],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
