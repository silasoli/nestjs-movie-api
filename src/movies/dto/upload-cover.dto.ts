import { ApiProperty } from '@nestjs/swagger';
export class UploadCoverDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
