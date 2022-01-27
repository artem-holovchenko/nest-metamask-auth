"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const eth_sig_util_1 = require("eth-sig-util");
const ethereumjs_util_1 = require("ethereumjs-util");
let AppService = class AppService {
    constructor(usersDBRepository, jwtService) {
        this.usersDBRepository = usersDBRepository;
        this.jwtService = jwtService;
    }
    async auth(user) {
        const { publicAddress, signature } = user;
        const gUser = await this.find(user);
        const msg = `I am signing my one-time nonce: ${gUser.nonce}`;
        const msgBufferHex = (0, ethereumjs_util_1.bufferToHex)(Buffer.from(msg, 'utf8'));
        const address = (0, eth_sig_util_1.recoverPersonalSignature)({
            data: msgBufferHex,
            sig: signature,
        });
        if (address.toLowerCase() === publicAddress.toLowerCase()) {
            gUser.nonce = Math.floor(Math.random() * 10000);
            await this.usersDBRepository.update({ nonce: gUser.nonce }, { where: { publicAddress: gUser.publicAddress } });
            const { publicAddress } = gUser;
            const payload = { publicAddress };
            const accessToken = await this.jwtService.sign(payload);
            console.log(accessToken);
            return { accessToken: accessToken };
        }
    }
    async find(user) {
        const gUser = await this.usersDBRepository.findOne({ where: { publicAddress: user.publicAddress } });
        return gUser;
    }
    async create(user) {
        let nonce = Math.floor(Math.random() * 10000);
        console.log(user);
        return await this.usersDBRepository.create({ publicAddress: user.publicAddress.toLowerCase(), nonce: nonce });
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USERS_REPOSITORY')),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map