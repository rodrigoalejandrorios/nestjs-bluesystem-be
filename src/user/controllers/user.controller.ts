import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PublicRoute } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @PublicRoute()
  @Post('register')
  createUser(@Body() createUserDTO: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUserSecure(createUserDTO);
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOneUser(id);
  }

  @Patch('update/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDTO: CreateUserDTO,
  ): Promise<UserEntity> {
    return this.userService.update(id, updateUserDTO);
  }
}
