import { JwtService } from '@nestjs/jwt';
import { IUser } from './interfaces/user.interface';
import { User } from './user.entity';
export declare class AppService {
    private usersDBRepository;
    private jwtService;
    constructor(usersDBRepository: typeof User, jwtService: JwtService);
    auth(user: IUser): Promise<{
        accessToken: string;
    }>;
    find(user: IUser): Promise<IUser>;
    create(user: IUser): Promise<IUser>;
}
