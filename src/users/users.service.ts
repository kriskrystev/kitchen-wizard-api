import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { EmailConflictException } from './exceptions/email-conflict.exception';
import { encodePassword } from '../utils/bcrypt';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ReadUserDto } from './dto/read-user.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectMapper() private readonly classMapper: Mapper
  ) {}

  /**
   * First of all this method checks if there is an existing user with the provided email
   * Encodes the password and saves the user entity
   * @param createUserDto the DTO used for creating a user
   * @return {Promise<ReadUserDto>>} - DTO with just the email, firstName, and lastName fields
   */
  async create(createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const emailExists = await this.userModel.findOne({
      email: createUserDto.email
    });

    if (emailExists) {
      throw new EmailConflictException();
    }

    const password = await encodePassword(createUserDto.password);

    const userEntity = await new this.userModel({
      ...createUserDto,
      password
    }).save();

    return this.classMapper.map(userEntity, User, ReadUserDto);
  }

  /**
   * Queries the DB for a user with the provided email
   * @param email the users email to filter by
   * @throws {UserNotFoundException}
   */
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  /**
   * Gets the user profile by email
   * @param email
   * @throws {UserNotFoundException}
   * @return {ReadUserDto} promise object that represents the ReadUserDto
   */
  async findUserProfile(email: string): Promise<ReadUserDto> {
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new UserNotFoundException();
    }

    return this.classMapper.map(user, User, ReadUserDto);
  }

  /**
   * Gets all the User documents
   */
  async findAll(): Promise<ReadUserDto[]> {
    return await this.classMapper.mapArrayAsync(
      await this.userModel.find(),
      User,
      ReadUserDto
    );
  }
}
