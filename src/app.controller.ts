import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';

var pjson = require('../package.json');

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    private health: HealthCheckService
  ) { }

  @Get()
  getHello(): string {
    return "hello";
  }

  @Get('health')
  checkHealth(): any {
    return this.health.check([]);
  }

  @Get('version')
  checkVersion(): any {
    return pjson.version;
  }

}
