import { Controller, Post, Body } from '@nestjs/common';
import { EmailServerService } from './email-server.service';

@Controller('email')
export class EmailServerController {
    constructor(private readonly emailServerService: EmailServerService) {}

    @Post('send-confirmation')
    async sendConfirmation(@Body() body: { email: string; username: string; token: string }) {
        await this.emailServerService.SendPostMail(body.email, body.username);
    }
}
