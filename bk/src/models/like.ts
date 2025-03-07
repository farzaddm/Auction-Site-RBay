import { Table, Column, Model, ForeignKey, DataType, Unique  } from "sequelize-typescript";
import { User } from "./user";
import { Item } from "./item";

@Table({ timestamps: true })
export class Like extends Model {
  @ForeignKey(() => User) // Each like must be associated with a user
  @Unique("unique_like") // Composite unique key
  // This decorator creates a composite unique constraint named unique_like.
  // Composite keys ensure that the combination of userId and itemId must be unique, i.e., a user can only like an item once.
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @ForeignKey(() => Item)
  @Unique("unique_like") // Composite unique key
  @Column({ type: DataType.INTEGER, allowNull: false })
  itemId!: number;
}