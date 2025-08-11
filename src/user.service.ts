import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [{ id: 1, name: 'Muhammad Taha', email: 'taha@taha.com' }];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(dto: CreateUserDto) {
    const id = this.users.length + 1;
    const newUser = { id, ...dto };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, dto: UpdateUserDto) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.users[index] = { ...this.users[index], ...dto, id };
    return this.users[index];
  }

  delete(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    const deleted = this.users.splice(index, 1);
    return deleted[0];
  }
}
