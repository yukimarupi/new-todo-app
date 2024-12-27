import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '全てのフィールドを入力してください。' },
        { status: 400 }
      );
    }

    // Nodemailer の設定
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // メールの内容
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'idaten7240@gmail.com',
      subject: 'お問い合わせフォームからのメッセージ',
      text: `
        お名前: ${name}
        メールアドレス: ${email}
        メッセージ: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: 'メールが送信されました！' });
  } catch (error) {
    console.error('メール送信エラー:', error);
    return NextResponse.json(
      { error: 'メール送信に失敗しました。' },
      { status: 500 }
    );
  }
}
