// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';
dotenv.config();

type ServerConfig = {
    PORT: number,
    REDIS_PORT?: number,
    REDIS_HOST?: string,
    ROOM_CRON: string
}

type DBConfig = {
    DB_HOST: string,
    DB_USER: string,
    DB_PASSWORD: string,
    DB_NAME: string

};


export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3001,
    REDIS_PORT: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    ROOM_CRON: process.env.ROOM_CRON || "0 2 * * *"
};

export const dbConfig: DBConfig = {
    DB_HOST: process.env.DB_HOST!,
    DB_USER: process.env.DB_USER!,
    DB_PASSWORD: process.env.DB_PASS!,
    DB_NAME: process.env.DB_NAME!
}