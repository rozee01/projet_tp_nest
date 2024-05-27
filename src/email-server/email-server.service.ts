import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailServerService {
    constructor(private mailerService: MailerService) {}
    async SendClassMail(email: string, name: string, className: string) {
        const url = 'https://www.google.tn';
        await this.mailerService.sendMail({
            to: email,
            subject: 'check this new Class',
            template: '../../src/email-server/templates/ClassCreation.hbs',
            context: {
                classname: className,
                name,
                url,
            },
        });
    }
    async SendPostMail(email: string, name: string, className: string) {
        const url = 'https://www.google.tn';
        await this.mailerService.sendMail({
            to: email,
            subject: 'check this new post',
            template: '../../src/email-server/templates/Posted.hbs',
            context: {
                classname: className,
                name,
                url,
            },
        });
    }
}
