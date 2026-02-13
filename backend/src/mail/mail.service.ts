import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: this.configService.get<boolean>('MAIL_SECURE'),
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendWelcomeEmail(to: string, name: string) {
    const subject = 'Bem-vindo à nossa plataforma!';
    const html = `
      <h1>Olá, ${name}!</h1>
      <p>Bem-vindo à nossa plataforma de e-commerce.</p>
      <p>Sua conta foi criada com sucesso.</p>
      <p>Aproveite nossa seleção de produtos!</p>
    `;

    await this.sendMail(to, subject, html);
  }

  async sendPasswordResetEmail(to: string, name: string, resetLink: string) {
    const subject = 'Redefinir sua senha';
    const html = `
      <h1>Olá, ${name}!</h1>
      <p>Você solicitou a redefinição de sua senha.</p>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${resetLink}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Redefinir Senha
      </a>
      <p>Este link expira em 1 hora.</p>
      <p>Se você não solicitou esta redefinição, ignore este email.</p>
    `;

    await this.sendMail(to, subject, html);
  }

  async sendOrderConfirmationEmail(to: string, name: string, orderData: any) {
    const subject = `Pedido confirmado - #${orderData.orderNumber}`;
    const html = `
      <h1>Olá, ${name}!</h1>
      <p>Seu pedido foi confirmado com sucesso!</p>
      
      <h2>Detalhes do Pedido</h2>
      <p><strong>Número:</strong> ${orderData.orderNumber}</p>
      <p><strong>Total:</strong> R$ ${orderData.total.toFixed(2)}</p>
      <p><strong>Status:</strong> ${orderData.status}</p>
      
      <h3>Itens:</h3>
      <ul>
        ${orderData.items
          .map(
            (item: any) => `
          <li>${item.productName} - Qtd: ${item.quantity} - R$ ${item.total.toFixed(2)}</li>
        `
          )
          .join('')}
      </ul>
      
      <p>Obrigado por sua compra!</p>
    `;

    await this.sendMail(to, subject, html);
  }

  async sendOrderStatusUpdateEmail(to: string, name: string, orderData: any) {
    const subject = `Atualização do pedido - #${orderData.orderNumber}`;
    const html = `
      <h1>Olá, ${name}!</h1>
      <p>Seu pedido foi atualizado!</p>
      
      <h2>Detalhes do Pedido</h2>
      <p><strong>Número:</strong> ${orderData.orderNumber}</p>
      <p><strong>Novo Status:</strong> ${orderData.status}</p>
      
      <p>Acompanhe o status do seu pedido em nossa plataforma.</p>
    `;

    await this.sendMail(to, subject, html);
  }

  async sendContactFormEmail(formData: any) {
    const subject = `Novo contato - ${formData.subject}`;
    const html = `
      <h1>Novo contato recebido</h1>
      
      <p><strong>Nome:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Telefone:</strong> ${formData.phone || 'Não informado'}</p>
      <p><strong>Assunto:</strong> ${formData.subject}</p>
      
      <h2>Mensagem:</h2>
      <p>${formData.message}</p>
    `;

    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    await this.sendMail(adminEmail, subject, html);
  }

  private async sendMail(to: string, subject: string, html: string) {
    try {
      const info = await this.transporter.sendMail({
        from: this.configService.get<string>('MAIL_FROM'),
        to,
        subject,
        html,
      });

      console.log('Email enviado:', info.messageId);
      return info;
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw error;
    }
  }
}
