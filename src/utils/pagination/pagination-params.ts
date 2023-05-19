import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationParams {
  @ApiProperty({
    required: false,
    description:
      'MongoID from which to begin the search. This is used for a more optimized search, as it makes use of MongoDBs id nature'
  })
  @IsOptional()
  @IsMongoId()
  startId?: string;

  @ApiProperty({
    required: false,
    description: 'The amount of documents to skip.',
    minimum: 0
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number;

  @ApiProperty({
    required: false,
    description:
      'The maximum number of documents to return. If provided must be at least 1.',
    minimum: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}
