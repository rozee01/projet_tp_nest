import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        // Initialize Nodemailer transporter
        this.transporter = nodemailer.createTransport({
            // Specify your email service provider
            service: 'Gmail', // Example: 'Gmail', 'SendGrid', etc.
            auth: {
                user: 'your-email@gmail.com', // Your email address
                pass: 'your-password', // Your email password or app password
            },
        });
    }

    async sendEmail(to: string, subject: string, text: string) {
        try {
            // Send email
            await this.transporter.sendMail({
                from: 'your-email@gmail.com', // Sender email address
                to, // Recipient email address
                subject, // Email subject
                text, // Email body (plaintext)
            });

            console.log(`Email sent successfully to ${to}`);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}
