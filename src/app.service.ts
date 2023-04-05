import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
    constructor(private readonly env: ConfigService) {}

    getHello(): string {
        return `Hello World! ${this.env.get('NODE_ENV')}`;
    }
}
