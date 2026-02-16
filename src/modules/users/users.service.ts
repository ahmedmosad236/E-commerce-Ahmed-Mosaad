import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly usersRepository: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { email, password, ...rest } = createUserDto;

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await this.usersRepository.findOne({ email: normalizedEmail }).exec();
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.usersRepository({
      email: normalizedEmail,
      password: hashedPassword,
      ...rest,
    });

    return user.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.usersRepository.find().select('-password -__v').exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.usersRepository
      .findById(id)
      .select('-password -__v')
      .exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    const normalizedEmail = email.trim().toLowerCase();
    return this.usersRepository
      .findOne({ email: normalizedEmail })
      .select('-password -__v')
      .exec();
  }

  async findByEmailWithPassword(email: string): Promise<UserDocument | null> {
    const normalizedEmail = email.trim().toLowerCase();
    return this.usersRepository
      .findOne({ email: normalizedEmail })
      .select('+password -__v')
      .exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    if ('password' in updateUserDto) {
      throw new ConflictException('Cannot update password here. Use changePassword endpoint.');
    }

    const updated = await this.usersRepository
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,            
        runValidators: true,  
      })
      .select('-password -__v')
      .exec();

    if (!updated) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.usersRepository.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.usersRepository
      .findById(id)
      .select('+password')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new ConflictException('Current password is incorrect');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
  }
}