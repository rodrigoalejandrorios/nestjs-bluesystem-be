import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDTO, UserDTO } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO): Promise<UserEntity> {
    return this.userService.create(createUserDTO);
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
