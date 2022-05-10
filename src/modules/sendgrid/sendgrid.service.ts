import { Injectable } from '@nestjs/common';
import { CreateSendgridDto } from './dto/create-sendgrid.dto';
import { SendgridApiService } from './sendgrid.api.service';
import { config } from '../../config';

@Injectable()
export class SendgridService {
  constructor(private sendgridApiService: SendgridApiService) {}

  async sendEmail(createSendgridDto: CreateSendgridDto): Promise<object> {
    const { to, emailBody, subject } = createSendgridDto;

    return await this.sendgridApiService.sendEmail({
      from: config.emailInfo,
      to,
      emailBody,
      subject,
    });
  }
}
