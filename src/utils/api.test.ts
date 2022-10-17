import { describe, expect } from "@jest/globals";
import { getUsers } from "./api";

describe("API Utils", () => {
  let users: any = null;

  beforeEach(async () => {
    users = await getUsers("user1");
  });

  it("getUsers not null", async () => {
    expect(users).not.toBe(null);
    console.log(users);
  });
});
