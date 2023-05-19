import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ValidMongoID } from '../utils/decorators/mongo-id-validation-decorator';
import { PaginationParams } from '../utils/pagination/pagination-params';
import { RequestWithUser } from '../utils/request-with-user';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { ReadIngredientDto } from './dto/read-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { IngredientAlreadyExistsException } from './exceptions/ingredient-already-exists.exception';
import { IngredientNotFoundException } from './exceptions/ingredient-not-found.exception';
import { IngredientsService } from './ingredients.service';

@ApiTags('ingredients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @ApiCreatedResponse({
    type: ReadIngredientDto,
    description: 'The record is created'
  })
  @ApiException(() => [
    IngredientAlreadyExistsException,
    BadRequestException,
    UnauthorizedException
  ])
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @ApiOkResponse({ description: 'Everything went ok.' })
  @ApiException(() => [BadRequestException, UnauthorizedException])
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

  @ApiParam({
    name: 'id',
    description: 'The id of the ingredient you wish to find'
  })
  @ApiOkResponse({ description: 'Everything went ok.' })
  @ApiException(() => [
    IngredientNotFoundException,
    UnauthorizedException,
    BadRequestException
  ])
  @Get(':id')
  findOne(@Param('id') @ValidMongoID() id: string) {
    return this.ingredientsService.findOne(id);
  }

  @ApiParam({
    name: 'id',
    description: 'The id of the ingredient you wish to update'
  })
  @ApiOkResponse({ description: 'Update was successful' })
  @ApiException(() => [
    IngredientNotFoundException,
    UnauthorizedException,
    BadRequestException
  ])
  @Patch(':id')
  update(
    @Param('id') @ValidMongoID() id: string,
    @Body() updateIngredientDto: UpdateIngredientDto
  ) {
    return this.ingredientsService.update(id, updateIngredientDto);
  }

  @ApiParam({
    name: 'id',
    description: 'The id of the ingredient you wish to delete'
  })
  @ApiOkResponse({ description: 'Deleted' })
  @ApiException(() => [
    IngredientNotFoundException,
    UnauthorizedException,
    BadRequestException
  ])
  @Delete(':id')
  remove(@Param('id') @ValidMongoID() id: string) {
    return this.ingredientsService.remove(id);
  }
}
