/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/entities/user.entity';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class EmailServerService {
    constructor (private mailerService: MailerService){}
    async SendPostMail(email: string, username: string, token : string){
        const url= 'https://www.google.tn?token=${token}';
        await this.mailerService.sendMail({
            to : email ,
            subject: "check this new post",
            template: '../../src/email-server/templates/Posted.hbs',
            context: {  
                name: username,
                url,
            },
        })
    }

}
