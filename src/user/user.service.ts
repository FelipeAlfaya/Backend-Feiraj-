import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data);

    await this.emailAlreadyExists(user.email);

    user.password = hashSync(user.password, 10);

    return this.userRepository.save(user).then((user) => {
      delete user.password;
      return user;
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(options);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async update(id: number, data: CreateUserDto): Promise<User> {
    const user = await this.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const updatedUser = this.userRepository.merge(user, data);

    return this.userRepository.save(updatedUser);
  }

  async remove(options: FindOneOptions<User>): Promise<void> {
    const user = await this.userRepository.findOne(options);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    await this.userRepository.delete(user.id);
  }

  async emailAlreadyExists(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new BadRequestException('Esse e-mail já está em uso.');
    }
  }
}
