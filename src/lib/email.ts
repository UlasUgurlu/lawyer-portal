import nodemailer from 'nodemailer';
import React from 'react';

// Email configuration
export const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  template?: React.ComponentType<any>;
  templateData?: any;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    let html = options.html;
    let text = options.text;

    // If template is provided, render it
    if (options.template && options.templateData) {
      const TemplateComponent = options.template;
      // For now, we'll use a simple render function
      // In production, you'd use @react-email/render
      html = `<div>Template rendering placeholder</div>`;
      if (!text && html) {
        // Generate plain text from HTML if not provided
        text = html.replace(/<[^>]*>/g, '');
      }
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@avukatportali.com',
      to: Array.isArray(options.to) ? options.to.join(',') : options.to,
      subject: options.subject,
      html,
      text,
    };

    await emailTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};

// Common email templates
export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  PASSWORD_RESET: 'password-reset',
  EMAIL_VERIFICATION: 'email-verification',
  NEW_DOCUMENT: 'new-document',
  HEARING_REMINDER: 'hearing-reminder',
  NEW_MESSAGE: 'new-message',
  INVOICE_CREATED: 'invoice-created',
  PAYMENT_RECEIVED: 'payment-received',
  CASE_ASSIGNMENT: 'case-assignment',
  TWO_FA_CODE: 'two-fa-code',
} as const;

// Template data interfaces
export interface WelcomeEmailData {
  name: string;
  loginUrl: string;
  firmName: string;
}

export interface PasswordResetEmailData {
  name: string;
  resetUrl: string;
  expiresIn: string;
}

export interface EmailVerificationData {
  name: string;
  verificationUrl: string;
}

export interface NewDocumentEmailData {
  recipientName: string;
  caseName: string;
  documentName: string;
  uploaderName: string;
  caseUrl: string;
}

export interface HearingReminderEmailData {
  recipientName: string;
  caseName: string;
  hearingDate: string;
  hearingTime: string;
  location?: string;
  caseUrl: string;
}

export interface NewMessageEmailData {
  recipientName: string;
  senderName: string;
  caseName: string;
  messagePreview: string;
  messageUrl: string;
}

export interface InvoiceEmailData {
  recipientName: string;
  invoiceNumber: string;
  amount: string;
  dueDate: string;
  invoiceUrl: string;
  paymentUrl?: string;
}

export interface TwoFACodeEmailData {
  name: string;
  code: string;
  expiresIn: string;
}

// Helper functions for specific email types
export const sendWelcomeEmail = async (to: string, data: WelcomeEmailData): Promise<void> => {
  await sendEmail({
    to,
    subject: `${data.firmName} - Hoş Geldiniz`,
    html: `
      <h1>Hoş Geldiniz, ${data.name}!</h1>
      <p>${data.firmName} avukat portalına hoş geldiniz.</p>
      <p>Portala giriş yapmak için aşağıdaki bağlantıya tıklayın:</p>
      <a href="${data.loginUrl}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Giriş Yap</a>
    `,
  });
};

export const sendPasswordResetEmail = async (to: string, data: PasswordResetEmailData): Promise<void> => {
  await sendEmail({
    to,
    subject: 'Parola Sıfırlama Talebi',
    html: `
      <h1>Parola Sıfırlama</h1>
      <p>Merhaba ${data.name},</p>
      <p>Parolanızı sıfırlamak için aşağıdaki bağlantıya tıklayın:</p>
      <a href="${data.resetUrl}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Parolayı Sıfırla</a>
      <p>Bu bağlantı ${data.expiresIn} sonra geçersiz olacaktır.</p>
      <p>Eğer bu talebi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
    `,
  });
};

export const sendEmailVerification = async (to: string, data: EmailVerificationData): Promise<void> => {
  await sendEmail({
    to,
    subject: 'E-posta Adresinizi Doğrulayın',
    html: `
      <h1>E-posta Doğrulama</h1>
      <p>Merhaba ${data.name},</p>
      <p>E-posta adresinizi doğrulamak için aşağıdaki bağlantıya tıklayın:</p>
      <a href="${data.verificationUrl}" style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">E-postayı Doğrula</a>
    `,
  });
};

export const sendTwoFACode = async (to: string, data: TwoFACodeEmailData): Promise<void> => {
  await sendEmail({
    to,
    subject: 'İki Faktörlü Doğrulama Kodu',
    html: `
      <h1>Doğrulama Kodu</h1>
      <p>Merhaba ${data.name},</p>
      <p>İki faktörlü doğrulama kodunuz:</p>
      <h2 style="font-family: monospace; font-size: 24px; color: #007bff;">${data.code}</h2>
      <p>Bu kod ${data.expiresIn} sonra geçersiz olacaktır.</p>
    `,
  });
};
