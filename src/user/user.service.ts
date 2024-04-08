import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
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

  async findAll(options: FindManyOptions<User>): Promise<User[]> {
    return this.userRepository.find(options);
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    const user = this.userRepository.findOne(options);

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

  async remove(id: number): Promise<void> {
    const user = await this.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    await this.userRepository.delete(id);
  }

  async emailAlreadyExists(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new InternalServerErrorException('Esse e-mail já está em uso.');
    }
  }
}
