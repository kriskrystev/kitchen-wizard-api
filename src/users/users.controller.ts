import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { MailService } from '../mail/mail.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const user = await this.usersService.create(createUserDto);
    await this.mailService.sendGreetingEmail(user.email);

    return user;
  }

  @Get()
  async getAll() {
    return await this.usersService.findAll();
  }
}
