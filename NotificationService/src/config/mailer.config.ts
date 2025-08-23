import nodemailer from 'nodemailer';
import { serverConfig } from '.';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: serverConfig.MAIL_USER,
        pass: serverConfig.MAIL_PASS
    },
    tls: {
        minVersion: 'TLSv1.2'
    }
});

export default transporter;