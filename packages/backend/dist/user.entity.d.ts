import { Model } from 'sequelize-typescript';
export declare class User extends Model {
    id: string;
    nonce: number;
    publicAddress: string;
}
