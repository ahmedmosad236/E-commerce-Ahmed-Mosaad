import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Role } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmailWithPassword(email);
  
    if (!user || !user.password) {
      return null; 
    }
  
    const isPasswordMatching = await bcrypt.compare(pass, user.password);
  
    if (!isPasswordMatching) {
      return null;
    }
  
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id }; 
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async signup(name: string, email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('This email is not excist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({
      name,
      email,
      password: hashedPassword,
      role: Role.USER,
    });

    const userObj = (newUser as any)?.toObject ? (newUser as any).toObject() : newUser;
    const { password: _, ...result } = userObj;
    return result; 
  }
}