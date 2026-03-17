import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'habiba@gmail.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  password: string;
}
