import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Bid } from "./bid";
import { View } from "./view";
import { Like } from "./like";
import { Chat } from "./chat";
import { User } from "./user";

@Table({ timestamps: true })
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

  @Column({
    type: DataType.ENUM,
    values: ["decorative", "furniture", "electronics", "clothing", "books", "toys", "sports"],
    allowNull: false,
  })
  category!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  hotness!: boolean;

  @ForeignKey(() => User) // Linking the user who created the item
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @BelongsTo(() => User) 
  user!: User;

  @HasMany(() => Bid)
  bids!: Bid[];

  @HasMany(() => View)
  viewsRecords!: View[];

  @HasMany(() => Like)
  likesRecords!: Like[];

  @HasMany(() => Chat)
  chats!: Chat[];
}
