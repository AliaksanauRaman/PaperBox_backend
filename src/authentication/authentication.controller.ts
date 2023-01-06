import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('authentication')
export class AuthenticationController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Request() req): Promise<unknown> {
    console.log(req.body);
    return req.user;
  }
}
