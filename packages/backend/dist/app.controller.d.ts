import { AppService } from './app.service';
import { UserAddressDto } from './dto/user-address.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { IUser } from './interfaces/user.interface';
export declare class AppController {
    private appService;
    constructor(appService: AppService);
    auth(userLoginDto: UserLoginDto): Promise<{
        accessToken: string;
    }>;
    create(userAddressDto: UserAddressDto): Promise<IUser>;
    find(userAddressDto: UserAddressDto): Promise<IUser>;
}
