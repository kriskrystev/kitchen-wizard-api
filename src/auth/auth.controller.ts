import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from '../utils/request-with-user';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthService) {}

  /**
   * The route handler will only be invoked if the user has been validated
   * The req parameter will contain a user property (populated by Passport during the passport-local authentication flow)
   * @param req - the nestjs request
   */
  @ApiBody({
    type: UserLoginDto
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: RequestWithUser) {
    return this.authService.login(req.user);
  }
}
