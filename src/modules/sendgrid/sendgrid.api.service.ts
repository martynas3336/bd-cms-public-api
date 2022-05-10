import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { config } from '../../config';

@Injectable()
export class SendgridApiService {
  async sendEmail({
    from,
    to,
    subject,
    emailBody,
  }: {
    from: string;
    to: string;
    subject: string;
    emailBody: unknown;
  }) {
    const url = `${config.sendgridApiHost}/v3/mail/send`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.sendgridApiKey}`,
    };
    const body = {
      personalizations: [
        {
          to: [
            {
              email: to,
            },
          ],
        },
      ],
      from: {
        email: from,
      },
      subject: subject,
      content: [
        {
          type: 'text/html',
          value: emailBody,
        },
      ],
    };
    await axios.post(url, body, {
      headers,
      validateStatus: function (status) {
        return status >= 200 && status <= 499;
      },
    });
    return {};
  }
}
