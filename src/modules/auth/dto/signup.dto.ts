import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Role } from 'src/modules/users/entities/user.entity';

export class SignupDto {
  @ApiProperty({
    description: 'User full name',
    example: 'Ahmed Mohammed',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'ahmed.mohammed@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password (minimum 6 characters)',
    example: 'P@ssw0rd123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'User role',
    enum: Role,
    example: Role.USER,
    required: false,
  })
  @IsOptional()                   
  @IsEnum(Role)
  role?: Role;
}