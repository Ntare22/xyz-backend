import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigurationService } from './envconfiguration.service';

describe('EnvconfigurationService', () => {
  let service: EnvConfigurationService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [EnvConfigurationService],
    }).compile();

    service = testingModule.get<EnvConfigurationService>(EnvConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
