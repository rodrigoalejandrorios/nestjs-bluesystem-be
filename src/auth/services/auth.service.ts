import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import { PayloadToken } from '../interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity | null> {
    const repoUserEmail = await this.userRepository.findOne({
      where: { email: username },
    });
    const repoUserUsername = await this.userRepository.findOne({
      where: { username: username },
    });
    //console.log(repoUserEmail);

    if (repoUserUsername) {
      const isMatch = await bcrypt.compare(password, repoUserUsername.password);
      if (isMatch) {
        return repoUserUsername;
      }
    }
    if (repoUserEmail) {
      const isMatch = await bcrypt.compare(password, repoUserEmail.password);
      if (isMatch) {
        return repoUserEmail;
      }
    }
    return null;
  }

  async generateJWT(user: UserEntity) {
    const userConsult = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['roleType'],
    });

    const payload: PayloadToken = {
      role: userConsult.roleType.roleType,
      sub: userConsult.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
