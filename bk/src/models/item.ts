import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Bid } from "./bid";
import { View } from "./view";
import { Like } from "./like";

@Table
export class Item extends Model {
  // sequelize make id itself
  // Sequelize also automatically manages the createdAt and updatedAt fields
  // "!:" means promise this property will be assigned a value before it is used
  @Column({ type: DataType.STRING, allowNull: false }) // type for db
  name!: string; // type for ts

  @Column({ type: DataType.TEXT, allowNull: false })
  description!: string;

  @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0.0 })
  price!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  pic!: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  views!: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  likes!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  duration!: number;

  @HasMany(() => Bid)
  bids!: Bid[];

  @HasMany(() => View)
  viewsRecords!: View[];

  @HasMany(() => Like)
  likesRecords!: Like[];
}
