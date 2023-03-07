import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { AutoMap } from "@automapper/classes";
import { REGEXES } from "../../utils/regexes";
import { VALIDATION_MESSAGES } from "../../utils/validation-messages";

export class CreateUserDto {

    @AutoMap()
    @IsNotEmpty()
    firstName: string;

    @AutoMap()
    @IsNotEmpty()
    lastName: string;

    @AutoMap()
    @IsEmail()
    email: string;

    @AutoMap()
    @IsNotEmpty()
    @Matches(REGEXES.PASSWORD, { message: VALIDATION_MESSAGES.INVALID_PASSWORD })
    password: string;
}
