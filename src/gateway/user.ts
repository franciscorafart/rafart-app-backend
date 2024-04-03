import { AppDataSource as ds } from "../data-source";
import { User } from "../entity/User";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcryptjs";
import { UserUpdateAttributes } from "../shared/types";
import { Roles } from "../shared/enums";
import { logError } from "../helpers/logger";

export const createUser = async (user: UserUpdateAttributes) => {
  const id = user.id || uuidv4();
  const date = new Date();

  try {
    const u = await ds
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: date,
          updatedAt: date,
          password: user.encryptedPassword,
          role: user.role || Roles.Fan,
          confirmed: user.confirmed,
        },
      ])
      .execute();

    return u.raw[0];
  } catch (e) {
    logError(`Error creating user ${e}`);
    return null;
  }
};

export const updateUser = async (
  user: User,
  updateProps: UserUpdateAttributes
) => {
  const date = new Date();

  try {
    await ds
      .createQueryBuilder()
      .update(User)
      .set({
        email: updateProps.email || user.email,
        firstName: updateProps.firstName || user.firstName,
        lastName: updateProps.lastName || user.lastName,
        updatedAt: date,
        password: updateProps.encryptedPassword || user.password,
        confirmed: updateProps.confirmed || user.confirmed,
      })
      .where("id = :id", { id: user.id })
      .execute();

    return user;
  } catch (error) {
    logError(`Error creating user ${error}`);
    return null;
  }
};

export const findUserById = async (userId: string): Promise<User | null> => {
  try {
    const query = ds.createQueryBuilder().select("user").from(User, "user");

    const user = await query.where("user.id = :id", { id: userId }).getOne();

    return user;
  } catch (error) {
    logError(`Error finding user ${error}`);
  }

  return null;
};

export const findByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await ds
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.email = :email", { email: email })
      .getOne();

    return user;
  } catch (error) {
    logError(`Error finding user ${error}`);
  }

  return null;
};

export const deleteUserById = async (userId: string): Promise<Boolean> => {
  try {
    const repository = ds.getRepository(User);
    const user = await findUserById(userId);
    if (user) {
      await repository.remove([user]);
    }

    return true;
  } catch (e) {
    logError(`Delete User Error ${e}`);
  }
  return false;
};

// Password management utilities. TODO: Move them somewhere else
export const genEncryptedPassword = (rawPassword: string) =>
  new Promise<string>((res, rej) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        rej(err);
      }
      bcrypt.hash(rawPassword, salt, function (err, hash) {
        if (err) {
          rej(err);
        }
        res(String(hash));
      });
    });
  });

export const comparePassword = (passw: string, hash: string) =>
  new Promise<boolean>((res, rej) => {
    bcrypt.compare(passw, hash, function (err: any, isMatch: boolean) {
      if (err) {
        rej(err);
      }
      res(isMatch);
    });
  });
