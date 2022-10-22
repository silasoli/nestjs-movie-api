import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'É necessário informar o email do usuário.' })
  @IsString({ message: 'Email deve ser uma string.' })
  @IsEmail({}, { message: 'O email informado deve ser válido' })
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'É necessário informar a senha do usuário.' })
  @IsString({ message: 'Password deve ser uma string.' })
  @MinLength(6, { message: 'Password deve conter no mínimo 6 caracteres' })
  password: string;
}
