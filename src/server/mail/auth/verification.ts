/* 'use server';
import { transporter } from "@/server/mail";

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
}; */