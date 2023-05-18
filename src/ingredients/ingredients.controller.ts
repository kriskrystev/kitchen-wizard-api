import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ValidMongoID } from '../utils/decorators/mongo-id-validation-decorator';
import { PaginationParams } from '../utils/pagination/pagination-params';
import { RequestWithUser } from '../utils/request-with-user';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { IngredientsService } from './ingredients.service';

@UseGuards(JwtAuthGuard)
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  findAll(
    @Req() request: RequestWithUser,
    @Query() { skip, limit, startId }: PaginationParams
  ) {
    return this.ingredientsService.findAll(
      request.user.userId,
      skip,
      limit,
      startId
    );
  }

  @Get(':id')
  findOne(@Param('id') @ValidMongoID() id: string) {
    return this.ingredientsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') @ValidMongoID() id: string,
    @Body() updateIngredientDto: UpdateIngredientDto
  ) {
    return this.ingredientsService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') @ValidMongoID() id: string) {
    return this.ingredientsService.remove(id);
  }
}
