
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  name: string;

  @Prop()
  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  email: string;

  @Prop()
  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  password: string;

  @Prop()
  @ApiProperty({ description: 'The role of the user' })
  @IsEnum(Role)
  role: Role;

  @Prop()
  @ApiProperty({ description: 'The created at date of the user' })
  @IsDate()
  createdAt: Date;

  @Prop()
  @ApiProperty({ description: 'The updated at date of the user' })
  @IsDate()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
