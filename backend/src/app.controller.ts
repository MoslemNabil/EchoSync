import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('api/voice-data')
  async saveVoiceData(@Body('text') text: string) {
    if (!text) {
      return { success: false, message: 'No text provided' };
    }
    return this.appService.appendVoiceData(text);
  }

  @Get('api/cleaned-data')
  async getCleanedData() {
    return this.appService.getCleanedData();
  }
}
