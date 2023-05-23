import { Request } from 'express';
import { AuthenticatedUserInfo } from '../auth/dto/authenticated-user-info';

export type RequestWithUser = {
  user: AuthenticatedUserInfo;
} & Request;
