import "reflect-metadata";
import { DataSource } from "typeorm";
import { Document } from "./entity/Document";
import { User } from "./entity/User";
import { AddUserAndDocumentModel1712338285673 } from "./migration/1712338285673-AddUserAndDocumentModel";

const sslRequired =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER_NAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  // ssl: sslRequired // TODO: Remove for Flyio?
  //   ? {
  //       ca: readFileSync(
  //         join(__dirname, "assets", "us-east-1-bundle.pem")
  //       ).toString(),
  //     }
  //   : undefined, // NOTE: Add RDS SSL certificate bundle .pem file to /assets directory in production
  ssl: undefined,
  synchronize: false, // NOTE: Automatic migration (make it false in production)
  logging: false,
  entities: [Document, User],
  migrations: [AddUserAndDocumentModel1712338285673],
  subscribers: [],
});
