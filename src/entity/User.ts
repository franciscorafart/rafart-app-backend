import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Roles } from "../shared/enums";
import { Document } from "./Document";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Document, (d) => d.creator, {
    nullable: true,
    onDelete: "SET NULL",
  })
  documents: Document[];

  @Column({ default: Roles.clientGuest })
  role: number;

  @Column({ type: "timestamptz" })
  createdAt: Date;

  @Column({ type: "timestamptz" })
  updatedAt: Date;

  @Column({ default: false })
  confirmed: boolean;
}
