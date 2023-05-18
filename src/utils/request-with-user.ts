import { Request } from 'express';
import { AuthenticatedUserInfo } from '../auth/models/authenticated-user-info';

export type RequestWithUser = {
  user: AuthenticatedUserInfo;
} & Request;
