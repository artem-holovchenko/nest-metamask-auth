import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { UserAddressDto } from './dto/user-address.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { IUser } from './interfaces/user.interface';

@Controller('api')
export class AppController {
  constructor(private appService: AppService) {}

  @Post('/auth')
  auth(@Body() userLoginDto: UserLoginDto): Promise<{accessToken: string}> {
    return this.appService.auth(userLoginDto);
  }

  @Post('/users')
  create(@Body() userAddressDto: UserAddressDto): Promise<IUser> {
    return this.appService.create(userAddressDto);
  }

  @Get('/users')
  find(@Query() userAddressDto: UserAddressDto): Promise<IUser> {
    return this.appService.find(userAddressDto);
  }

}
