import { Table, Model, Column, Unique } from 'sequelize-typescript';
import { DataTypes } from "sequelize";

@Table
export class User extends Model {
    @Column({
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @Column
    nonce: number;

    @Column
    publicAddress: string;
}
