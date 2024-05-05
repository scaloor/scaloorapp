'use server';
import * as aws from '@aws-sdk/client-ses';
import * as nodemailer from "nodemailer"

const ses = new aws.SES({
    region: `${process.env.AWS_REGION}`,
    credentials: {
        accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
        secretAccessKey: `${process.env.AWS_SECRET_KEY}`,
    },
});

const transporter = nodemailer.createTransport({
    SES: { ses, aws },
});


export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-verification?token=${token}`;

    await transporter.sendMail({
        from: `${process.env.MAIL_ADMIN}`,
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    });
};


export const testMail = async (email: string) => {
    const response = await transporter.sendMail({
        from: "oliver.markey@outlook.com",
        to: "olimarat32@gmail.com",
        subject: "Hello From AusMart",
    })
}