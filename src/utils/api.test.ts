import { describe, expect } from "@jest/globals";
import { getUsers, getRepos, getCommits } from "./api";

describe("API Utils", () => {
  let users: any = null;
  let repos: any = null;
  let commits: any = null;

  beforeEach(async () => {
    users = await getUsers("user1");
    repos = await getRepos("user1");
    commits = await getCommits("user1", "reo1");
  });

  it("getUsers not null", async () => {
    expect(users).not.toBe(null);
  });

  it("getRepos not null", async () => {
    expect(repos).not.toBe(null);
  });

  it("getCommits not null", async () => {
    expect(commits).not.toBe(null);
  });
});
