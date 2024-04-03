import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { User } from "./User";

@Entity()
export class Document {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (u) => u.documents, {
    nullable: true,
    onDelete: "SET NULL",
  })
  creator: User;

  @Column()
  name: string; // display name

  @Column()
  key: string; // Unique name to store document in S3

  @Column()
  resourceLink: string;

  @Column({ type: "timestamptz" })
  createdAt: Date;

  @Column({ type: "timestamptz" })
  updatedAt: Date;
}
