import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { SendgridApiService } from './sendgrid.api.service';

@Module({
  providers: [SendgridService, SendgridApiService],
  exports: [SendgridService],
})
export class SendgridModule {}
