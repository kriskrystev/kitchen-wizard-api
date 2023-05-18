import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty } from 'class-validator';

export class CreateIngredientDto {
  @IsNotEmpty()
  @ApiProperty()
  @AutoMap()
  title: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @Allow()
  description: string;
}
