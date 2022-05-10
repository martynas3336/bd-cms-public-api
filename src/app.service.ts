import { Injectable } from '@nestjs/common';
import { config } from './config';

@Injectable()
export class AppService {
  healthcheck() {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return {
      environment: `${config.env || 'unknown'}`,
      dateTime: `${new Date()}`,
      isHealthy: true,
      heap: `The script uses approximately ${Math.round(used * 100) / 100} MB`,
      node: `${process.version}`,
    };
  }
}
