import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Get,
  Res,
} from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import path = require('path');
import { diskStorage } from 'multer';
import { UploadCoverDto } from '../dto/upload-cover.dto';
import { Movie } from '../entities/movie.entity';
import { Observable, of } from 'rxjs';

export const storage = diskStorage({
  destination: './uploads/covers',
  filename: (req, file, cb) => {
    const filename: string =
      path.parse(file.originalname).name.replace(/\s/g, '') +
      new Date().getTime();
    const extension: string = path.parse(file.originalname).ext;

    cb(null, `${filename}${extension}`);
  },
});

@ApiBearerAuth()
@ApiTags('movies')
@Controller('movies')
@UseGuards(AuthGuard('jwt'))
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateMovieDto): Promise<Movie> {
    try {
      await this.moviesService.validCreate(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return this.moviesService.create(dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateMovieDto,
  ): Promise<Movie> {
    try {
      await this.moviesService.validUpdate(id, dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return this.moviesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async remove(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.remove(id);
  }

  @Post(':id/cover')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadCoverDto })
  @UseInterceptors(FileInterceptor('file', { storage }))
  public async uploadCoverById(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Movie> {
    return this.moviesService.updateCover(id, { file: file.filename });
  }

  @Get(':id/cover')
  @HttpCode(HttpStatus.OK)
  public async getCoverById<T>(
    @Param('id') id: string,
    @Res() res,
  ): Promise<Observable<T>> {
    const fileUrl = await this.moviesService.getCoverByMovie(id);

    return of(res.sendFile(fileUrl));
  }

  @Delete(':id/cover')
  @HttpCode(HttpStatus.OK)
  public async removeCoverById(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.updateCover(id, { file: null });
  }
}
