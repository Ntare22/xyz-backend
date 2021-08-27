import { Module } from '@nestjs/common';
import { EnvConfigurationService } from './configuration/envconfiguration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './configuration/config.schema';
import { AuthModule} from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterModule } from './common/registration/register.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('DB_URL'),
          useCreateIndex: true,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useFindAndModify: false,
        }
      }
    }),
    AuthModule,
    RegisterModule
  ],
  controllers: [],
  providers: [EnvConfigurationService],
})
export class AppModule {
  static port: number;

  constructor(private readonly envConfigurationService: EnvConfigurationService) {
    AppModule.port = this.envConfigurationService.port as number
  }
}
