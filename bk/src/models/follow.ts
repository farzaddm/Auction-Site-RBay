import { Table, Column, Model, ForeignKey, DataType } from "sequelize-typescript";
import { User } from "./user";

@Table({ timestamps: true })
export class Follow extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  followerId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  followingId!: number;
}
