// // src/auth/auth.module.ts
// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { LocalStrategy } from './strategies/local.strategy';
// import { UsersModule } from '../users/users.module';
// import accessTokenConfig from 'src/config/access-token.config';
// import refreshTokenConfig from 'src/config/refresh-token.config';
// import { AccessTokenStrategy } from './strategies/access-token.strategy';
// import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';


// @Module({
//   imports: [
//     UsersModule,
//     PassportModule,
//     ConfigModule.forFeature(accessTokenConfig), 
//     ConfigModule.forFeature(refreshTokenConfig), 
//     JwtModule.registerAsync({
//       inject: [accessTokenConfig.KEY],
//       useFactory: (config) => ({
//         secret: config.secret,
//         signOptions: { expiresIn: config.expiresIn },
//       }),
//     }),

//     JwtModule.registerAsync({
//       inject: [refreshTokenConfig.KEY],
//       useFactory: (config) => ({
//         secret: config.secret,
//         signOptions: { expiresIn: config.expiresIn },
//       }),
//     }),
//   ],
//   providers: [
//     AuthService,
//     LocalStrategy,
//     AccessTokenStrategy,
//     RefreshTokenStrategy,
//   ],
//   controllers: [AuthController],
//   exports: [AuthService],
// })
// export class AuthModule {}
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import refreshTokenConfig from 'src/config/refresh-token.config';
import accessTokenConfig from 'src/config/access-token.config';

@Module({
  imports: [
    UsersModule,
    PassportModule,

    ConfigModule.forFeature(accessTokenConfig),
    ConfigModule.forFeature(refreshTokenConfig),

    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(accessTokenConfig)],
      inject: [accessTokenConfig.KEY],
      useFactory: (config) => ({
        secret: config.secret,
        signOptions: { expiresIn: config.expiresIn },
      }),
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(refreshTokenConfig)], 
      inject: [refreshTokenConfig.KEY],
      useFactory: (config) => ({
        secret: config.secret,
        signOptions: { expiresIn: config.expiresIn },
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}