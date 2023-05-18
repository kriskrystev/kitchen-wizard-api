import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { REGEXES } from '../../utils/regexes';
import { VALIDATION_MESSAGES } from '../../utils/validation-messages';

export class CreateUserDto {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @AutoMap()
  @ApiProperty()
  @IsEmail()
  email: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @Matches(REGEXES.PASSWORD, { message: VALIDATION_MESSAGES.INVALID_PASSWORD })
  password: string;
}
