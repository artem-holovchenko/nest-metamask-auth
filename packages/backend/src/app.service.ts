import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import { IUser } from './interfaces/user.interface';
import { User } from './user.entity';

@Injectable()
export class AppService {


    constructor(
        @Inject('USERS_REPOSITORY')
        private usersDBRepository: typeof User,
        private jwtService: JwtService,
    ) { }

    async auth(user: IUser): Promise<{ accessToken: string }> {
        const { publicAddress, signature } = user;
        //find user
        const gUser = await this.find(user);

        const msg = `I am signing my one-time nonce: ${gUser.nonce}`;

        // We now are in possession of msg, publicAddress and signature. We
        // will use a helper from eth-sig-util to extract the address from the signature
        const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
        const address = recoverPersonalSignature({
            data: msgBufferHex,
            sig: signature,
        });

        // The signature verification is successful if the address found with
        // sigUtil.recoverPersonalSignature matches the initial publicAddress
        if (address.toLowerCase() === publicAddress.toLowerCase()) {
            ////////////////////////////////////////////////////
            // Step 3: Generate a new nonce for the user
            ////////////////////////////////////////////////////
            gUser.nonce = Math.floor(Math.random() * 10000);
            await this.usersDBRepository.update(
                { nonce: gUser.nonce }, { where: { publicAddress: gUser.publicAddress } }
            );

            const { publicAddress } = gUser;
            const payload = { publicAddress };
            const accessToken: string = await this.jwtService.sign(payload);
            console.log(accessToken);
            return { accessToken: accessToken };
        }

    }

    async find(user: IUser): Promise<IUser> {
        const gUser = await this.usersDBRepository.findOne({ where: { publicAddress: user.publicAddress } });
        return gUser;
    }

    async create(user: IUser): Promise<IUser> {
        let nonce = Math.floor(Math.random() * 10000);
        console.log(user);
        return await this.usersDBRepository.create({ publicAddress: user.publicAddress.toLowerCase(), nonce: nonce });
    }

}
