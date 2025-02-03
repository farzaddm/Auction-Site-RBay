import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import { User } from "./user";

@Table
export class Follow extends Model {
  @ForeignKey(() => User)
  @Column
  followerId!: number;

  @ForeignKey(() => User)
  @Column
  followingId!: number;
}
