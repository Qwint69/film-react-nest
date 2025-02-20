import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { configProvider } from './app.config.provider';
import { Film } from './films/entities/film.entity.';
import { Schedule } from './films/entities/schedule.entity';
import { Order } from './order/entities/order.entity';
import { FilmsRepository } from './repository/films.repository';
import { OrdersRepository } from './repository/order.repository';
import { Logger } from '@nestjs/common';
import { JsonLogger } from './logger/json.logger';
import { DevLogger } from './logger/dev.logger';
import { TskvLogger } from './logger/tskv.logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Film, Schedule, Order],
        synchronize: false,
      }),
    }),

    TypeOrmModule.forFeature([Film, Schedule, Order]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    FilmsRepository,
    OrdersRepository,
    FilmsService,
    OrderService,
    configProvider,
    {
      provide: Logger,
      useClass:
        process.env.LOG_FORMAT === 'tskv'
          ? TskvLogger
          : process.env.NODE_ENV === 'production'
            ? JsonLogger
            : DevLogger,
    },
  ],
})
export class AppModule {}
