import { Controller, Post, Request, UseGuards } from '@nestjs/common';
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
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
