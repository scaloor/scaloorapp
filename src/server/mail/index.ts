import * as aws from '@aws-sdk/client-ses';
import * as nodemailer from "nodemailer"

const ses = new aws.SES({
    region: `${process.env.AWS_USER_REGION}`,
    credentials: {
        accessKeyId: `${process.env.AWS_USER_ACCESS_KEY}`,
        secretAccessKey: `${process.env.AWS_USER_SECRET_KEY}`,
    },
});

export const transporter = nodemailer.createTransport({
    SES: { ses, aws },
});