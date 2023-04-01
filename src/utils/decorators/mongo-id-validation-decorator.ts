import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common';

import mongoose from 'mongoose';

/**
 * Validates a request id parameter.
 */
export const ValidMongoID = createParamDecorator(
  (id = 'id', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!mongoose.Types.ObjectId.isValid(request.params[id])) {
      throw new BadRequestException('Invalid id');
    }

    return request;
  }
);
