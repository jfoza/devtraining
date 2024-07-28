import { hash } from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }

  async create(userDto: UserDTO): Promise<User> {
    const userEmailExists: User = await this.usersRepository.findOne({
      where: { email: userDto.email },
    });

    if (userEmailExists) {
      throw new HttpException(
        'User email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    userDto.password = await hash(userDto.password, 10);

    const user: User = this.usersRepository.create({
      ...userDto,
    });

    return await this.usersRepository.save(user);
  }
}
