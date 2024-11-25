import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true
    }),
    CacheModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            store: redisStore,
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            auth_pass: configService.get('REDIS_PASSWORD'),
            ttl: configService.get('REDIS_TTL'), // => to second
        }),
        inject: [ConfigService],
        isGlobal: true, // Đặt cache có sẵn trên toàn ứng dụng
    })]
})
export class RedisCacheModule { }
