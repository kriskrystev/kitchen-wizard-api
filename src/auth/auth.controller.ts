import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RequestWithUser } from '../utils/request-with-user';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthService) {}

  /**
   * The route handler will only be invoked if the user has been validated
   * The req parameter will contain a user property (populated by Passport during the passport-local authentication flow)
   * @param req - the nestjs request
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: RequestWithUser) {
    return this.authService.login(req.user);
  }
}
