import { User } from "../entity/User";

export const usersToResponseUsers = (users: User[]) =>
  users.map((u) => userToResponseUser(u));

export const userToResponseUser = (user?: User | null) =>
  user
    ? {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        confirmed: user.confirmed,
      }
    : null;
