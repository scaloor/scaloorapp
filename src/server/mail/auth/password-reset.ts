import { transporter } from "@/server/mail";

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `${process.env.NEXT_PUBLIC_URL}/auth/new-password?token=${token}`

    await transporter.sendMail({
        from: `${process.env.MAIL_ADMIN}`,
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
    });
};
