import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService
  ) {}

  async uploadImage(file: Express.Multer.File, userId: string) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    // Validar tipo de arquivo
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Tipo de arquivo não suportado. Use JPEG, PNG ou WebP'
      );
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('Arquivo muito grande. Máximo 5MB');
    }

    try {
      const uploadResult = await this.processAndUploadImage(file, userId);

      // Salvar informações no banco
      const uploadRecord = await this.prisma.upload.create({
        data: {
          fileName: uploadResult.fileName,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: uploadResult.size,
          url: uploadResult.url,
          uploadedBy: userId,
          type: 'IMAGE',
        },
      });

      return {
        id: uploadRecord.id,
        url: uploadRecord.url,
        fileName: uploadRecord.fileName,
        size: uploadRecord.size,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao processar imagem');
    }
  }

  async uploadImages(files: Express.Multer.File[], userId: string) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    if (files.length > 10) {
      throw new BadRequestException('Máximo 10 arquivos por vez');
    }

    const results = await Promise.all(
      files.map(file => this.uploadImage(file, userId))
    );

    return results;
  }

  async uploadFile(file: Express.Multer.File, userId: string) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    // Validar tamanho (máximo 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new BadRequestException('Arquivo muito grande. Máximo 10MB');
    }

    try {
      const uploadResult = await this.processAndUploadFile(file, userId);

      // Salvar informações no banco
      const uploadRecord = await this.prisma.upload.create({
        data: {
          fileName: uploadResult.fileName,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url: uploadResult.url,
          uploadedBy: userId,
          type: 'FILE',
        },
      });

      return {
        id: uploadRecord.id,
        url: uploadRecord.url,
        fileName: uploadRecord.fileName,
        size: uploadRecord.size,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao processar arquivo');
    }
  }

  async removeFile(fileId: string, userId: string) {
    const uploadRecord = await this.prisma.upload.findUnique({
      where: { id: fileId },
    });

    if (!uploadRecord) {
      throw new NotFoundException('Arquivo não encontrado');
    }

    if (uploadRecord.uploadedBy !== userId) {
      throw new ForbiddenException('Acesso negado');
    }

    try {
      // Remover arquivo físico
      await this.deletePhysicalFile(uploadRecord.fileName);

      // Remover registro do banco
      await this.prisma.upload.delete({
        where: { id: fileId },
      });

      return { message: 'Arquivo removido com sucesso' };
    } catch (error) {
      throw new BadRequestException('Erro ao remover arquivo');
    }
  }

  private async processAndUploadImage(
    file: Express.Multer.File,
    userId: string
  ) {
    const fileName = `${uuidv4()}-${Date.now()}.webp`;
    const uploadPath = this.getUploadPath();

    // Criar diretório se não existir
    await fs.promises.mkdir(uploadPath, { recursive: true });

    const filePath = path.join(uploadPath, fileName);

    // Processar imagem com Sharp
    const processedImage = await sharp(file.buffer)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toFile(filePath);

    const baseUrl = this.configService.get<string>(
      'APP_URL',
      'http://localhost:3000'
    );
    const url = `${baseUrl}/uploads/${fileName}`;

    return {
      fileName,
      size: processedImage.size,
      url,
    };
  }

  private async processAndUploadFile(
    file: Express.Multer.File,
    userId: string
  ) {
    const ext = path.extname(file.originalname);
    const fileName = `${uuidv4()}-${Date.now()}${ext}`;
    const uploadPath = this.getUploadPath();

    // Criar diretório se não existir
    await fs.promises.mkdir(uploadPath, { recursive: true });

    const filePath = path.join(uploadPath, fileName);

    // Salvar arquivo
    await fs.promises.writeFile(filePath, file.buffer);

    const baseUrl = this.configService.get<string>(
      'APP_URL',
      'http://localhost:3000'
    );
    const url = `${baseUrl}/uploads/${fileName}`;

    return {
      fileName,
      url,
    };
  }

  private async deletePhysicalFile(fileName: string) {
    const uploadPath = this.getUploadPath();
    const filePath = path.join(uploadPath, fileName);

    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      // Arquivo pode não existir fisicamente
      console.warn(`Arquivo não encontrado: ${filePath}`);
    }
  }

  private getUploadPath(): string {
    // Em produção, usar S3 ou outro serviço de armazenamento
    return path.join(process.cwd(), 'uploads');
  }
}
