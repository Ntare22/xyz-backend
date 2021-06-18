import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { EnvConfigurationService } from './configuration/envconfiguration/envconfiguration.service';

@Module({
  imports: [HomeModule],
  controllers: [],
  providers: [EnvConfigurationService],
})
export class AppModule {
  static port: number;

  constructor(private readonly envConfigurationService: EnvConfigurationService) {
    AppModule.port = this.envConfigurationService.port as number
  }
}
