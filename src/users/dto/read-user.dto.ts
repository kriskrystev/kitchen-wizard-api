import { AutoMap } from "@automapper/classes";

export class ReadUserDto {
    @AutoMap()
    email: string;

    @AutoMap()
    firstName: string;

    @AutoMap()
    lastName: string;
}
