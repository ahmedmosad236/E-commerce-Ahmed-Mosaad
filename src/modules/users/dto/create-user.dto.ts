import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, Matches, MinLength } from "class-validator";
import { Role } from "../entities/user.entity";
import { MaxLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: 'The name of the user' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'The email of the user' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'The password of the user' })
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' })
    password: string;

    @ApiProperty({ description: 'The role of the user' })
    @IsEnum(Role)
    role: Role;
}
