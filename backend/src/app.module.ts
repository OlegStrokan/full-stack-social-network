import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports:  [
  ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`
  }),
  ServeStaticModule.forRoot({
    rootPath: path.resolve(__dirname, 'static')
  }),
  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST ,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    models: [],
    autoLoadModels: true
  }),
    UsersModule],
})
export class AppModule {}
