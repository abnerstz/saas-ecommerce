import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import type { UserRole } from '../common/types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(registerDto: RegisterDto) {
    const {
      email,
      password,
      firstName,
      lastName,
      role = 'CUSTOMER',
    } = registerDto;

    // Verificar se o usuário já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar usuário
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: role as UserRole,
        isEmailVerified: false,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });

    // Gerar tokens
    const tokens = await this.generateTokens(user);

    return {
      user,
      ...tokens,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar usuário
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar se usuário está ativo
    if (!user.isActive) {
      throw new UnauthorizedException('Conta desativada');
    }

    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    };

    // Gerar tokens
    const tokens = await this.generateTokens(userResponse);

    return {
      user: userResponse,
      ...tokens,
    };
  }

  async validateUser(payload: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isEmailVerified: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!user || !user.isActive) {
      return null;
    }

    return user;
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.validateUser(payload);
      if (!user) {
        throw new UnauthorizedException('Token inválido');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Não revelar se o email existe ou não
      return {
        message: 'Se o email existir, um link de redefinição será enviado',
      };
    }

    // Gerar token de reset
    const resetToken = this.jwtService.sign(
      { userId: user.id, type: 'password_reset' },
      {
        secret: this.configService.get<string>('JWT_RESET_SECRET'),
        expiresIn: '1h',
      }
    );

    // TODO: Implementar envio de email
    console.log(`Reset token for ${email}: ${resetToken}`);

    return {
      message: 'Se o email existir, um link de redefinição será enviado',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_RESET_SECRET'),
      });

      if (payload.type !== 'password_reset') {
        throw new UnauthorizedException('Token inválido');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      // Hash da nova senha
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Atualizar senha
      await this.prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      return { message: 'Senha redefinida com sucesso' };
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Senha atual incorreta');
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Atualizar senha
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Senha alterada com sucesso' };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async logout(userId: string) {
    // Atualizar último login
    await this.prisma.user.update({
      where: { id: userId },
      data: { lastLogin: new Date() },
    });

    return { message: 'Logout realizado com sucesso' };
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_VERIFY_SECRET'),
      });

      if (payload.type !== 'email_verification') {
        throw new UnauthorizedException('Token inválido');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      if (user.isEmailVerified) {
        return { message: 'Email já foi verificado' };
      }

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          isEmailVerified: true,
          emailVerifiedAt: new Date(),
        },
      });

      return { message: 'Email verificado com sucesso' };
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  async resendVerificationEmail(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user.isEmailVerified) {
      return { message: 'Email já foi verificado' };
    }

    // Gerar token de verificação
    const verificationToken = this.jwtService.sign(
      { userId: user.id, type: 'email_verification' },
      {
        secret: this.configService.get<string>('JWT_VERIFY_SECRET'),
        expiresIn: '24h',
      }
    );

    // TODO: Implementar envio de email
    console.log(`Verification token for ${user.email}: ${verificationToken}`);

    return { message: 'Email de verificação enviado' };
  }

  private async generateTokens(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '24h'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_EXPIRES_IN',
          '7d'
        ),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
