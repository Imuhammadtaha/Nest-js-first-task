import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import express from 'express';

@Controller('users')
export class UserController {
  private users = [{ id: 1, name: 'Muhammad Taha', email: 'taha@taha.com' }];

  @Get('')
  getAllStudent(@Res() res: express.Response) {
    try {
      return res.status(HttpStatus.OK).send({
        success: true,
        message: 'User Fetched Successfully',
        data: this.users,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'Error in fetching user',
      });
    }
  }

  @Get(':id')
  getStudentById(@Param('id') id: string, @Res() res: express.Response) {
    try {
      const user = this.users.find((u) => u.id === +id);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).send({
          success: false,
          message: 'User not found',
        });
      }
      return res.status(HttpStatus.OK).send({
        success: true,
        message: 'User Fetched',
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'Error in fetching user',
      });
    }
  }
  @Post()
  createUser(
    @Body() newUser: { name: string; email: string },
    @Res() res: express.Response,
  ) {
    try {
      if (!newUser.email || !newUser.name) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          success: false,
          message: 'Email and Name are mandatory',
        });
      }
      const id = this.users.length + 1;
      const user = { id, ...newUser };
      this.users.push(user);
      return res.status(HttpStatus.OK).send({
        success: true,
        message: 'User Created Successfully',
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'Error in creating user',
      });
    }
  }
  @Post(':id')
  updateStudent(
    @Param('id') id: string,
    @Body() newUser: { name: string; email: string },
    @Res() res: express.Response,
  ) {
    try {
      const index = this.users.findIndex((u) => u.id === +id);
      if (index === -1) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          success: false,
          message: 'User Not Found',
        });
      }
      this.users[index] = { id: +id, ...newUser };
      return res.status(HttpStatus.OK).send({
        success: true,
        message: 'User Updated Successfully',
        data: this.users[index],
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'Error in updation',
      });
    }
  }
  @Delete(':id')
  deleteStuden(@Param('id') id: string, @Res() res: express.Response) {
    try {
      console.log(`Id = ${id}`);
      const index = this.users.findIndex((u) => u.id === +id);
      if (index === -1) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          success: false,
          message: 'User Not Found',
        });
      }
      const deleted = this.users.splice(index, 1);
      return res.status(HttpStatus.OK).send({
        success: true,
        message: 'User Deleted Successfully',
        data: deleted[0],
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'Error in deletion',
      });
    }
  }
}
