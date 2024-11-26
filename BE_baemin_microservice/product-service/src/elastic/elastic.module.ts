import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Global()
@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                node: config.get("ELASTIC_NODE"),
                auth: {
                    username: config.get("ELASTIC_USER"),
                    password: config.get("ELASTIC_PASS")
                },
                tls: {
                    rejectUnauthorized: false
                }
            }),
            inject: [ConfigService]
        })
    ],
    exports: [ElasticsearchModule]
})
export class ElasticModule { }
