import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MailService } from '../mail/mail.service';
import { PaginationParams } from '../utils/pagination/pagination-params';
import { CreateUserDto } from './dto/create-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const user = await this.usersService.create(createUserDto);
    // fix this
    // await this.mailService.sendGreetingEmail(user.email);

    return user;
  }

  @Get()
  async getAll(@Query() { skip, limit, startId }: PaginationParams) {
    return await this.usersService.findAll(skip, limit, startId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.findUserProfile(req.user.email);
  }
}
