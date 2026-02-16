
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true , select: false })
  @Exclude()
  password: string;

  @Prop({ required: true, enum: Role, default: Role.USER })
  role: Role;

  @Prop({ type: String, select: false }) 
  refreshToken?: string;

  @Prop({ type: Date })
  refreshTokenExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
