import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import express from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(@Res() res: express.Response) {
    try {
      const users = this.usersService.findAll();
      return res.status(HttpStatus.OK).send({
        success: true,
        message: 'Users fetched successfully',
        data: users,
      });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'Error in fetching users',
      });
    }
  }

  @Get(':id')
  getUserById(@Param('id') id: string, @Res() res: express.Response) {
    try {
      const user = this.usersService.findOne(+id);
      return res.status(HttpStatus.OK).send({
        success: true,
        message: 'User fetched successfully',
        data: user,
      });
    } catch (error: unknown) {
      const status =
        typeof error === 'object' && error !== null && 'status' in error
          ? (error as { status?: number }).status
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message?: string }).message
          : 'Error in fetching user';
      return res.status(status || HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message,
      });
    }
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto, @Res() res: express.Response) {
    try {
      const user = this.usersService.create(newUser);
      return res.status(HttpStatus.CREATED).send({
        success: true,
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'Error in creating user',
      });
    }
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updatedUser: UpdateUserDto,
    @Res() res: express.Response,
  ) {
    try {
      const user = this.usersService.update(+id, updatedUser);
      return res.status(HttpStatus.OK).send({
        success: true,
        message: 'User updated successfully',
        data: user,
      });
    } catch (error: unknown) {
      const status =
        typeof error === 'object' && error !== null && 'status' in error
          ? (error as { status?: number }).status
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message?: string }).message
          : 'Error in updating user';
      return res.status(status || HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message,
      });
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string, @Res() res: express.Response) {
    try {
      const user = this.usersService.delete(+id);
      return res.status(HttpStatus.OK).send({
        success: true,
        message: 'User deleted successfully',
        data: user,
      });
    } catch (error) {
      const status =
        typeof error === 'object' && error !== null && 'status' in error
          ? (error as { status?: number }).status
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message?: string }).message
          : 'Error in deleting user';
      return res.status(status || HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message,
      });
    }
  }
}
