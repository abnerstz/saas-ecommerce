import {
  Controller,
  Post,
  Delete,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Param,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('upload')
@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: 'Upload de uma imagem' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('id') userId: string
  ) {
    return this.uploadService.uploadImage(file, userId);
  }

  @ApiOperation({ summary: 'Upload de múltiplas imagens' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Post('images')
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser('id') userId: string
  ) {
    return this.uploadService.uploadImages(files, userId);
  }

  @ApiOperation({ summary: 'Upload de arquivo' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('id') userId: string
  ) {
    return this.uploadService.uploadFile(file, userId);
  }

  @ApiOperation({ summary: 'Remover arquivo' })
  @ApiBearerAuth()
  @Delete(':fileId')
  removeFile(
    @Param('fileId') fileId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.uploadService.removeFile(fileId, userId);
  }
}
