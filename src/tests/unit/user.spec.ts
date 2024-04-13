import { superAdmin } from "tests/fixtures/users";
import { AppDataSource as ds } from "data-source";
import {
  createUser,
  deleteUserById,
  findByEmail,
  findUserById,
  updateUser,
} from "gateway/user";
import { User } from "entity/User";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";

let repository;

beforeAll(async () => {
  await ds.initialize();
  repository = ds.getRepository(User);
});

afterAll(async () => {
  await repository.query(`DELETE FROM public.user`);
  await ds.destroy();
});

beforeEach(async () => {
  await repository.query(`DELETE FROM public.user`);

  await createUser(superAdmin);
});

describe("createUser", () => {
  describe("For new user data", () => {
    it("creates a user", async () => {
      const u = await findByEmail("francisco.rafart@gmail.com");

      expect(u.firstName).toBe("Francisco");
      expect(u.lastName).toBe("Rafart");
      expect(u.confirmed).toBe(false);
    });
  });
  describe("for existing user id", () => {
    it("doesn't create users", async () => {
      let u = await findByEmail("francisco.rafart@gmail.com");

      await createUser({
        ...superAdmin,
        id: u.id,
        lastName: "Rafartiano",
        firstName: "Franciscano",
        confirmed: true,
      });

      u = await findByEmail("francisco.rafart@gmail.com");

      expect(u.firstName).toBe("Francisco");
      expect(u.lastName).toBe("Rafart");
      expect(u.confirmed).toBe(false);
    });
  });
  describe("for same data but different uuid", () => {
    it("creates new user", async () => {
      await createUser({ ...superAdmin, id: undefined });

      const count = await repository.query(`Select count(*) FROM public.user`);

      expect(count[0].count).toBe("2");
    });
  });
});

describe("For created user,", () => {
  it("finds user by id", async () => {
    const u = await findUserById(superAdmin.id);
  });
});

describe("updateUser", () => {
  describe("for existing user data", () => {
    it("should update user", async () => {
      let u = await findByEmail("francisco.rafart@gmail.com");

      await updateUser(u, { confirmed: true, lastName: "Rafartiano" });
      u = await findByEmail("francisco.rafart@gmail.com");

      expect(u.confirmed).toBe(true);
      expect(u.lastName).toBe("Rafartiano");
      expect(u.firstName).toBe("Francisco");
    });
  });
});

describe("deleteUser", () => {
  it("should delete existent user", async () => {
    const u = await findByEmail("francisco.rafart@gmail.com");
    const success = await deleteUserById(u.id);

    const count = await repository.query(`Select count(*) FROM public.user`);

    expect(success).toBe(true);
    expect(count[0].count).toBe("0");
  });
  it("should return false for inexistent user", async () => {
    const fakeId = "f56bd95f-496d-456a-886e-c652a6dc2c1b";
    const success = await deleteUserById(fakeId);

    const count = await repository.query(`Select count(*) FROM public.user`);

    expect(success).toBe(false);
    expect(count[0].count).toBe("1");
  });
});
