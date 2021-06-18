import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module'
import { HomeModule } from './home.module';
import { INestApplication } from '@nestjs/common';

describe('Home', () => {
    let app: INestApplication;
    let appModule: INestApplication

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [HomeModule, AppModule]
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it('/GET home', () => {
        return request(app.getHttpServer())
                .get('/home')
                .expect(200)
    });

    it('should be defined', () => {
        expect(app).toBeDefined();
      });

})
