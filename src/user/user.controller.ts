import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { IRequest } from 'src/common/interfaces/request.interface';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
  }),
)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async findAllUsers() {
    return this.userService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() request: IRequest) {
    const userId = request.get<number>('user_id');

    return this.userService.findOne({
      where: {
        id: userId,
      },
    });
  }

  @Get(':id')
  async findOneUser(@Param('id') userId: number): Promise<User> {
    const user = await this.userService.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }
}
