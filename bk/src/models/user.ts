import { Table, Column, Model, DataType, HasMany, BelongsToMany } from "sequelize-typescript";
import { Bid } from "./bid";
import { View } from "./view";
import { Like } from "./like";
import { Chat } from "./chat";
import { Follow } from "./follow";

@Table({
  indexes: [
    {
      unique: true,
      fields: ['email']
    }
  ],
  timestamps: true,
})
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true, validate: { isEmail: true } })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  pic!: string;

  @Column({ type: DataType.DATE, allowNull: true })
  date_of_birth!: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  job!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  education!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  location!: string;

  @HasMany(() => Bid)
  bids!: Bid[];

  @HasMany(() => View)
  views!: View[];

  @HasMany(() => Like)
  likes!: Like[];

  @HasMany(() => Chat)
  chats!: Chat[];

  @BelongsToMany(() => User, () => Follow, 'followerId', 'followingId')
  followings!: User[];

  @BelongsToMany(() => User, () => Follow, 'followingId', 'followerId')
  followers!: User[];
}
