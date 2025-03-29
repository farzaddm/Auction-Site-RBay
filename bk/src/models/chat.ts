import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user";
import { Item } from "./item";

@Table({ timestamps: true })
export class Chat extends Model {
  @Column({ type: DataType.TEXT, allowNull: false })
  message!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Item)
  @Column({ type: DataType.INTEGER, allowNull: false })
  itemId!: number;

  @BelongsTo(() => Item)
  item!: Item;
}
