import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvConfigurationService {
    public port;

    constructor() {
        this.port = process.env.PORT || 3000
    }
}
