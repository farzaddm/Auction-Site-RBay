import { Table, Column, Model, ForeignKey, DataType, Unique } from "sequelize-typescript";
import { User } from "./user";
import { Item } from "./item";

@Table
export class View extends Model {
  @ForeignKey(() => User)
  @Unique("unique_view")
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @ForeignKey(() => Item)
  @Unique("unique_view")
  @Column({ type: DataType.INTEGER, allowNull: false })
  itemId!: number;
}
