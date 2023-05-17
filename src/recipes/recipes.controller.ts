import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ValidMongoID } from '../utils/decorators/mongo-id-validation-decorator';
import { PaginationParams } from '../utils/pagination/pagination-params';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipesService } from './recipes.service';

@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto, @Request() request) {
    return this.recipesService.create(createRecipeDto, request.user.userId);
  }

  @Get()
  findAll(@Request() req, @Query() { skip, limit, startId }: PaginationParams) {
    return this.recipesService.findAll(req.user.userId, skip, limit, startId);
  }

  @Get(':id')
  findOne(@Param('id') @ValidMongoID() id: string) {
    return this.recipesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') @ValidMongoID() id: string,
    @Body() updateRecipeDto: UpdateRecipeDto
  ) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') @ValidMongoID() id: string) {
    return this.recipesService.remove(id);
  }
}
