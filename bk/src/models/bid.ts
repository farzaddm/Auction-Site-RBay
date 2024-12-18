import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user";
import { Item } from "./item";

@Table
export class Bid extends Model {
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  bid_amount!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id!: number;

  @ForeignKey(() => Item)
  @Column({ type: DataType.INTEGER, allowNull: false })
  item_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Item)
  item!: Item;
}
